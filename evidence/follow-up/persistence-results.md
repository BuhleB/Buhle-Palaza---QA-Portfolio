# Free Pipeline: local persistence regression

This is a new AI-assisted portfolio follow-up, not a reconstruction of the original production retest.

## Result

- Current uploaded source: **3 passed**.
- Valid submission: HTTP 201, success true, one committed database row, expected field values and a saved CV file.
- Missing email: HTTP 400, email validation error, no database record.
- Missing CV: HTTP 400, CV validation error, no database record.
- Mutation check in a separate source copy: replace `db.session.commit()` in `free_pipeline()` with `db.session.flush()`. The route still returned HTTP 201 and success true, but the fresh database session found zero rows. The positive test failed at `assert len(rows) == 1`, as intended.

## Scope

Python 3.12; pytest; actual forms blueprint, SQLAlchemy model and upload utility; temporary file-backed SQLite and temporary uploads. Email and analytics functions were stubbed. The isolated Flask harness does not load the full production application, CSRF, admin routes or PostgreSQL. The fixture file checks storage; it is not a document-content validation test. These results do not verify historical recovery, email delivery or the live admin dashboard.

## Reproduce

Download `test_pipeline_persistence.py` and `requirements.txt` from this folder. Use a disposable virtual environment and a checkout of the matching Makwande source:

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
MAKWANDE_BACKEND=/absolute/path/to/Makwande/backend pytest -q test_pipeline_persistence.py
```

PowerShell, after activating the environment:

```powershell
$env:MAKWANDE_BACKEND = "C:\path\to\Makwande\backend"
python -m pytest -q test_pipeline_persistence.py
```

No production credentials or email configuration are needed. To reproduce the mutation check, change only a disposable copy of the backend. Keep the original source intact.

## Source fingerprints (SHA-256)

- `routes/forms.py`: `b9d15bf2ea2f16e6ff417451b07fd29816e7d0a3034a058ad796622f52645f55`
- `models.py`: `cbc5c77be7a450613008903b5c122e6115356d5bb6553be56db76c9326f324e5`
- `utils.py`: `5c2077f6e404f1e088204e6dcb2da1af932424f83114d8ff1680b283fa641f3e`
- `extensions.py`: `0080c1e933f1b741caf42594f0fe3069b92635e0c05535a9ea85bcfb0ba43bd7`
