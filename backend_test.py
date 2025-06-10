import requests
import sys
from datetime import datetime

def main():
    # Since this is a frontend-only application with no backend API,
    # we'll just verify that the frontend is running
    try:
        response = requests.get("http://localhost:5175")
        if response.status_code == 200:
            print("✅ Frontend is running successfully")
            return 0
        else:
            print(f"❌ Frontend returned status code: {response.status_code}")
            return 1
    except Exception as e:
        print(f"❌ Error connecting to frontend: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())