from os import  path, system as cmd


if __name__ == "__main__":
    # check if requirements.txt exists
    if not path.exists("requirements.txt"):
        raise FileExistsError("requirements file doesn't exist.\n \
                               Please make a requirements.txt file and write all dependencies in it")
    # make virtual environment if it doesn't exist
    if not path.exists(".venv"):
        cmd("python3 -m venv .venv")
    cmd("bash setup_commands.sh")