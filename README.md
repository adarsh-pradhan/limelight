# Limelight


### For linux:

Terminal 1:

- `python -m venv .venv`
- `source ./.venv/bin/activate`
- `pip install -r requirements.txt`
- `python upload_initial_data.py`
- `python main.py`


Terminal 2:
- `sudo pacman -S redis`
- `redis-server`


Terminal 3:
- `source ./.venv/bin/activate`
- `celery -A main:celery_app worker -l INFO`


Terminal 4:
- `yay -S mailhog`
- `mailhog`


## Folder Structure
```
.
├── application
│   ├── __init__.py
│   ├── instances.py
│   ├── mail_service.py
│   ├── models.py
│   ├── __pycache__
│   │   ├── __init__.cpython-312.pyc
│   │   ├── instances.cpython-312.pyc
│   │   ├── mail_service.cpython-312.pyc
│   │   ├── models.cpython-312.pyc
│   │   ├── resources.cpython-312.pyc
│   │   ├── sec.cpython-312.pyc
│   │   ├── tasks.cpython-312.pyc
│   │   ├── views.cpython-312.pyc
│   │   └── worker.cpython-312.pyc
│   ├── resources.py
│   ├── sec.py
│   ├── tasks.py
│   ├── test.html
│   ├── views.py
│   └── worker.py
├── celerybeat-schedule
├── celeryconfig.py
├── config.py
├── dump.rdb
├── instance
│   └── dev.db
├── main.py
├── __pycache__
│   ├── celeryconfig.cpython-312.pyc
│   ├── config.cpython-312.pyc
│   └── main.cpython-312.pyc
├── README.md
├── requirements.txt
├── static
│   ├── components
│   │   ├── AdminFind.js
│   │   ├── AdminInfo.js
│   │   ├── AdminStats.js
│   │   ├── AdminUsers.js
│   │   ├── AdRequestEdit.js
│   │   ├── AdRequestForm.js
│   │   ├── CampaignEdit.js
│   │   ├── CampaignForm.js
│   │   ├── CampaignView.js
│   │   ├── Home.js
│   │   ├── InfluencerFind.js
│   │   ├── InfluencerHome.js
│   │   ├── InfluencerStats.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   │   ├── Signup.js
│   │   ├── SponsorAdRequestForm.js
│   │   ├── SponsorCampaigns.js
│   │   ├── SponsorFind.js
│   │   ├── SponsorHome.js
│   │   ├── SponsorStats.js
│   │   └── Welcome.js
│   ├── images
│   │   └── lime.jpg
│   ├── index.js
│   └── router.js
├── templates
│   ├── activity_report.html
│   ├── daily_reminder.html
│   └── index.html
├── test.csv
└── upload_initial_data.py
```