"""Local route/database regression check against an existing Makwande checkout.

Run: MAKWANDE_BACKEND=/path/to/Makwande/backend pytest -q test_pipeline_persistence.py
Uses the real forms blueprint, model and file utility, SQLite and temporary uploads.
Email/analytics are stubbed; this does not verify production, CSRF or admin UI.
"""
import io
import os
import sys
from pathlib import Path

import pytest
from flask import Flask

sys.path.insert(0, os.environ['MAKWANDE_BACKEND'])
from extensions import db
from models import FreePipelineSubmission
from routes import forms


@pytest.fixture
def application(tmp_path, monkeypatch):
    app = Flask(__name__)
    app.config.update(TESTING=True, SQLALCHEMY_DATABASE_URI='sqlite:///' + str(tmp_path / 'checks.sqlite'), UPLOAD_FOLDER=str(tmp_path))
    db.init_app(app)
    app.register_blueprint(forms.forms_bp)
    monkeypatch.setattr(forms, 'send_admin_notification', lambda *a, **kw: None)
    monkeypatch.setattr(forms, 'send_user_acknowledgement', lambda *a, **kw: None)
    monkeypatch.setattr(forms, 'send_ga4_event', lambda *a, **kw: None)
    with app.app_context():
        db.create_all()
    yield app
    with app.app_context():
        db.session.remove()
        db.drop_all()


def payload():
    return dict(full_name='QA Regression Candidate', email='qa@example.test', phone='0000000000', location='Test location', career_interest='QA', work_authorization='Citizen', experience_years='1', qualification='Diploma', cv_file=(io.BytesIO(b'%PDF-1.4\n% regression fixture\n'), 'test-cv.pdf'))


def test_success_means_submission_is_committed(application):
    response = application.test_client().post('/free-pipeline', data=payload(), content_type='multipart/form-data')
    assert response.status_code == 201
    assert response.json['success'] is True
    # Fresh application context/session after the request: catches an omitted commit.
    with application.app_context():
        rows = db.session.execute(db.select(FreePipelineSubmission)).scalars().all()
        assert len(rows) == 1
        row = rows[0]
        assert row.email == 'qa@example.test'
        assert row.full_name == 'QA Regression Candidate'
        assert row.status == 'New'
        assert row.cv_original_name == 'test-cv.pdf'
        assert (Path(application.config['UPLOAD_FOLDER']) / row.cv_filename).is_file()


@pytest.mark.parametrize('missing', ['email', 'cv_file'])
def test_invalid_submission_creates_no_record(application, missing):
    data = payload()
    del data[missing]
    response = application.test_client().post('/free-pipeline', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert missing in response.json['errors']
    with application.app_context():
        assert db.session.execute(db.select(FreePipelineSubmission)).scalars().all() == []
