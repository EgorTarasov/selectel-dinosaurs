from app.main import create_app
import uvicorn

app = create_app()


uvicorn.run(app, host="0.0.0.0", port=8000)
