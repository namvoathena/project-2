# Base Image
FROM python:3.10.10

# Install netcat
RUN apt-get update && \
    apt-get -y install netcat && \
    apt-get clean

# set working directory
WORKDIR /usr/src/app

# add and install requirements
COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# add app
COPY . /usr/src/app

# run server
CMD python3 index.py run -h 0.0.0.0