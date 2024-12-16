import pytest
from flask_backend.app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_serve(client):
    response = client.get('/')
    assert response.status_code == 200

def test_test_route(client):
    response = client.get('/test')
    assert response.status_code == 200

