import os
import sys
import subprocess

def main():
    print("Starting the backend server...")
    
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Change to the backend directory
    backend_dir = os.path.join(script_dir, "backend")
    
    # Check if backend directory exists
    if not os.path.exists(backend_dir):
        print(f"Error: Backend directory not found at {backend_dir}")
        return
    
    # Set up the command to run the backend server
    cmd = [sys.executable, "-m", "uvicorn", "app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
    
    try:
        # Change to the backend directory
        os.chdir(backend_dir)
        print(f"Changed to directory: {os.getcwd()}")
        
        # Run the command
        print(f"Running command: {' '.join(cmd)}")
        subprocess.run(cmd)
    except Exception as e:
        print(f"Error starting backend server: {e}")

if __name__ == "__main__":
    main() 