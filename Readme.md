# install

````
bundle install
npm install
rails s
````

# bgmr web hosting bei Uberspace

## Kontodaten

uberspace.de

Name: bgmr

## Serverdaten

Server: spica.uberspace.de
IPv4: 185.26.156.17
IPv6: 2a00:d0c0:200:0:b9:1a:9c11:351

Webspace: bgrm.spica.uberspace.de

`ssh bgrm@spica.uberspace.de`

Details: [https://uberspace.de/dashboard/datasheet]()

### directories

~/bgmr_live: rails running live version -> version-controlled content will be overwritten by git post-receive hook
~/bgmr.git: bare git repository -> push updates bgmr_live and restarts server
dummy-images: images for fake projects for testing (see seeds.rb)

### git server

to enable push:
- add your ssh public key to the webspace
- `git remote add live ssh://bgmr@spica.uberspace.de/home/bgmr/bgmr.git/`

### rails server

restart: `svc -du ~/service/bgmr-web`

port: 62480

see ~/html/.htaccess & ~/service/bgmr-web

### postgres

postgress is set up according to uberspace manual, but not in use, sqlite is used instead