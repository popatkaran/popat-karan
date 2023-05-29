---
slug: '/blog/spryker/install-general'
date: '2021-11-23'
title: 'Spryker installation All'
category: 'Spryker'
tags: ['spryker', 'installation', 'karan', 'karan popat', 'popatkaran']
type: 'professional'
order: 1
---

### [Install Docker](https://docs.docker.com/engine/install/ubuntu/)

## Get your windows system ready

- Docker Desktop for Windows installation

  - [download Docker Desktop for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) and install it as administrator; leave all default options.
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
    root = / options = "metadata,umask=22,fmask=11"
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
    cp /c/Users/karan.popat/.ssh/id_rsa /home/spryker/.ssh/
    cp /c/Users/karan.popat/.ssh/id_rsa.pub /home/spryker/.ssh/
    chmod 0644 /home/spryker/.ssh/id_rsa.pub
    chmod 0600 /home/spryker/.ssh/id_rsa
    chmod 0700 /home/spryker/.ssh
    ```
  - Clone project repository into your home directory. Then, clone Socker SDK into it.

    ```
    cd ~
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202108.0  --single-branch ./b2b-demo-shop
    cd b2b-demo-shop
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

    Fix xDebug settings
    client_host setting has to be overwritten.
    Edit following files:

docker/deployment/default/context/php/debug/etc/php/debug.conf.d/69-xdebug.ini
docker/context/php/debug/etc/php/debug.conf.d/69-xdebug.ini
and replace xdebug.client_host=\${SPRYKER_XDEBUG_HOST_IP} with xdebug.client_host=host.docker.internal.

In case of issues with host resolving try to reset you Docker Desktop application;
image.png

and set
image.png

Export environment variable:

export SPRYKER_PROJECT_NAME=shs-ecommerce-dev
Now, install the project.

Troubleshooting
In case during docker/sdk up you will get below error:
ERROR: for gateway Cannot start service gateway: b'Ports are not available: listen tcp 0.0.0.0:80: bind: An attempt was made to access a socket in a way forbidden by its access permissions.'

Please run cmd as Administrator and run below command:
NET stop HTTP

Confirm commandtyping Y and press Enter. After all servisec will stop, please run once again docker/sdk up to resume Spryker configuration.

If there are problems with communication with wsl, for example, it is not possible to ping google.com, it may mean problems with the DNS configuration.

In this case, we edit the wsl.conf file with the command:
sudo vim /etc/wsl.conf
In the mentioned file, add entries:
[network]
generateResolvConf = false
as shown in the screenshot below
image.png
After saving the changes to the file, disconnect from the machine and restart wsl and reconnect to Ubuntu-20.04. The /etc/resolv.conf file should be removed, now we should redefine it in root mode. To do this, follow the instructions below:
sudo su
echo nameserver 8.8.8.8 > /etc/resolv.conf
Check if the file was created correctly
image.png
Then disconnect from the machine and restart wsl and reconnect to Ubuntu-20.04, run ping google.com to make sure your communication is working properly
image.png

If the ping is done correctly, but when you run sudo apt update && sudo apt dist-upgrade or other commands that use network connections, you get the following error:
image.png
Symantec may be blocking your inbound traffic. To verify, go to the Symantec Endpoint Protection application, then go to: Network and Host Exploit Mitigation -> View Network Activity. If the value in the "Incoming Blocked" field increases during the execution of mentioned earlier commands, contact the support team to change the firewall configuration.
image.png

PhpStorm configuration
Create a new PHP Empry Project and select WSL as location, e.g:

\\wsl\$\Ubuntu-20.04\home\spryker\eCommerce

### Install Spryker

- Clone repository:
  - B2B Shop
    ```
    git clone https://github.com/spryker-shop/b2b-demo-shop.git -b 202108.0 --single-branch ./b2b-demo-shop
    ```
  - B2C Shop
    ```
    git clone https://github.com/spryker-shop/b2c-demo-shop.git -b 202108.0 --single-branch ./b2b-demo-shop
    ```
- navigate inside the shop directory
  ```
  cd b2b-demo-shop
  ...
  cd b2c-demo-shop
  ```
- Clone the Docker SDK repository

  ```
  git clone https://github.com/spryker/docker-sdk.git --single-branch docker
  ```

  ```
  xdebug.remote_host=host.docker.internal
  xdebug.client_host=host.docker.internal
  ```

- Add your user to the docker group
  ```
  sudo usermod -aG docker $USER
  ```
- Bootstrap local docker setup
  ```
  docker/sdk bootstrap deploy.dev.yml
  ```
- update hosts file
  ```
   sudo bash -c "echo '127.0.0.1 backend-api.at.spryker.local backend-api.de.spryker.local backend-api.us.spryker.local backend-gateway.at.spryker.local backend-gateway.de.spryker.local backend-gateway.us.spryker.local backoffice.at.spryker.local backoffice.de.spryker.local glue.at.spryker.local glue.de.spryker.local glue.us.spryker.local mail.spryker.local queue.spryker.local redis-commander.spryker.local scheduler.spryker.local spryker.local swagger.spryker.local yves.at.spryker.local yves.de.spryker.local yves.us.spryker.local zed.us.spryker.local' >> /etc/hosts"
  ```
- build and start the instance
  ```
  docker/sdk up
  ```
