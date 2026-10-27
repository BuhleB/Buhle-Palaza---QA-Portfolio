# tests/test_basic.py
# Minimal test suite to validate the app starts and core routes respond.
# These run in CI on every push via GitHub Actions.

import pytest
import sys
import os

# Add the backend folder to the path so we can import from it
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app import create_app


@pytest.fixture
def app():
    """Create a test app instance using TestingConfig."""
    os.environ['ADMIN_USERNAME'] = 'testadmin'
    os.environ['ADMIN_PASSWORD'] = 'testpassword123'

    app = create_app('testing')
    yield app


@pytest.fixture
def client(app):
    """Test client for making requests."""
    return app.test_client()


def test_app_creates_successfully(app):
    """Verify the app factory returns a valid Flask app."""
    assert app is not None


def test_homepage_returns_200(client):
    """Verify the homepage loads without errors."""
    response = client.get('/')
    assert response.status_code == 200


def test_admin_login_page_returns_200(client):
    """Verify the admin login page is accessible."""
    response = client.get('/admin/login')
    assert response.status_code == 200


def test_404_returns_404(client):
    """Verify unknown routes return a 404."""
    response = client.get('/this-page-does-not-exist')
    assert response.status_code == 404