---
slug: '/blog/spryker/install'
date: '2021-11-23'
title: 'Spryker installation'
category: "spryker"
category_key: 'spryker'
category_key: 'spryker'
tags: ['spryker', 'installation', 'karan', 'karan popat', 'popatkaran']
type: 'professional'
image: '../../../images/platforms/banner-spryker.png'
order: 0
---

### Get your windows system ready

- Docker Desktop for Windows installation

  - [Download Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) and install it as administrator; leave all default options.
  - Run Docker Desktop.

- Download the Linux kernel update package from [here](https://aka.ms/wsl2kernel/) and install the package as an administrator.
- Open Docker Desktop settings and navigate to General tab. Make sure all checkboxes are checked.

- Open PowerShell as administrator and execute:

  ```
  wsl --set-default-version 2
  wsl --list
  ```

  > You shouldn't have any distribution as yet. In that case download and install Ubuntu-20.04 from Microsoft Store. Restart if needed.

- Create `spryker` user with `spryker` password.

- Set WSL2 and validate:

  ```
  wsl --set-version Ubuntu-20.04 2
  wsl –list -v
  ```

- Increase a default memory for WSL2 by creating .wslconfig file in user profile location

  ```
  notepad "$env:USERPROFILE/.wslconfig"
  ```

  - Content of a config may look for example like this

    ```
    [wsl2]
    memory=8GB # Limits VM memory in WSL 2 up to 8GB
    processors=4 # Makes the WSL 2 VM use 4 virtual processors
    ```

- Login to Ubuntu:

  ```
  wsl -d Ubuntu-20.04
  ```

- create /etc/wsl.conf, e.g.:

  ```
  sudo nano /etc/wsl.conf
  ```

  - add following content:

    ```
    # Enable extra metadata options by default
    [automount]
    enabled = true
    root = /
    options = "metadata,umask=22,fmask=11"
    mountFsTab = false
    ```

- Now, exit from Ubuntu, terminate it and start again:

  ```
  wsl -t Ubuntu-20.04
  wsl -d Ubuntu-20.04
  ```

- Docker installation
  - Login to WSL2 Ubuntu instance via PowerShell or your favourite terminal

  ```
  wsl -d Ubuntu-20.04
  ```

  - Update and install necessary tools

  ```
  sudo apt update && sudo apt dist-upgrade
  sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt-get install docker-ce docker-ce-cli containerd.io
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo apt-get install ruby ruby-dev
  sudo gem install docker-sync
  echo "export DOCKER_HOST=tcp://localhost:2375" >> ~/.bashrc
  export DOCKER_HOST=tcp://localhost:2375
  ```

  - check docker version

  ```
  docker version
  ```

  - check docker compose version

  ```
  docker-compose version
  ```

- Spryker installation

  - Login to WSL2 Ubuntu instance via PowerShell as administration

    ```
    wsl -d Ubuntu-20.04
    ```

  - Make sure docker is running

    ```
    sudo service docker status
    ```

  - Copy your id_rsa SSH keys to /home/spryker/.ssh/ folder and make sure to set proper permissions. E.g.:

    ```
    mkdir /home/spryker/.ssh
    cp /c/Users/<user_name>/.ssh/id_rsa /home/spryker/.ssh/
    cp /c/Users/<user_name>/.ssh/id_rsa.pub /home/spryker/.ssh/
    chmod 0644 /home/spryker/.ssh/id_rsa.pub
    chmod 0600 /home/spryker/.ssh/id_rsa
    chmod 0700 /home/spryker/.ssh
    ```

  - Clone project repository into your home directory. Then, clone Socker SDK into it.

    ```
    cd ~
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202108.0  --single-branch ./<project_name>
    cd <project_name>
    git clone https://github.com/spryker/docker-sdk.git --single-branch docker

    ```

  - Bootstrap local docker setup

    ```
    sudo docker/sdk bootstrap deploy.dev.yml
    ```

  - Copy host entries you were provided to your WSL /etc/hosts and Windows C:\Windows\System32\drivers\etc\hosts.

    ```
    # spryker b2b demo setup
    127.0.0.1       spryker.local
    127.0.0.1       backend-api.de.spryker.local
    127.0.0.1       backend-api.at.spryker.local
    127.0.0.1       backend-api.us.spryker.local
    127.0.0.1       backend-gateway.at.spryker.local
    127.0.0.1       backend-gateway.de.spryker.local
    127.0.0.1       backend-gateway.us.spryker.local
    127.0.0.1       backoffice.de.spryker.local
    127.0.0.1       backoffice.at.spryker.local
    127.0.0.1       backoffice.us.spryker.local
    127.0.0.1       glue.at.spryker.local
    127.0.0.1       glue.de.spryker.local
    127.0.0.1       glue.us.spryker.local
    127.0.0.1       mail.spryker.local
    127.0.0.1       queue.spryker.local
    127.0.0.1       redis-commander.spryker.local
    127.0.0.1       scheduler.spryker.local
    127.0.0.1       swagger.spryker.local
    127.0.0.1       yves.de.spryker.local
    127.0.0.1       yves.at.spryker.local
    127.0.0.1       yves.us.spryker.local
    ```

  - Build and start the instance

    ```
    sudo docker/sdk up
    ```

- Setup project in VSCode or PhpStorm with file path

  ```
    \\wsl$\Ubuntu-20.04\home\spryker\<project_name>
  ```
