# The Grove

Basically social media, but for plants.

## Overview

Create an account, add plants to your account, and see what plants your friends have!

## Dependencies

- Node
- NPM
- Postgres

---

Make sure the last 11 lines of your `pg_hba.conf` look like this:

```
# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
local   replication     all                                     trust
host    replication     all             127.0.0.1/32            trust
host    replication     all             ::1/128                 trust
```

## Install Instructions

It's complicated, so pay VERY close attention:

Step 1:

```
git clone https://gitlab.com/Varuna3/PlantHub && cd PlantHub && npm i && npm run superinit && npm run start
```

And voila! You're done!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

# psst

After signing in, click on your profile picture.

You didn't hear it from me.
