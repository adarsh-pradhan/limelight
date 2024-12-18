from flask import Flask
from flask_security import SQLAlchemyUserDatastore, Security
from application.models import db, User, Role
from config import DevelopmentConfig
from application.resources import api
from application.sec import datastore
from application.worker import celery_init_app
import flask_excel as excel
from celery.schedules import crontab
from application.tasks import daily_reminder
from application.instances import cache


def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    db.init_app(app)
    api.init_app(app)
    excel.init_excel(app)
    app.security = Security(app, datastore)
    cache.init_app(app)
    with app.app_context():
        import application.views

    return app


app = create_app()
celery_app = celery_init_app(app)


# Daily Reminder
@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=13, minute=27),
        daily_reminder.s('adarsh@limelight.com', 'Daily Test'),
    )


# Monthly report 
@celery_app.on_after_configure.connect
def setup_periodic_monthly_report(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour=13, minute=27, day_of_month=12),
        monthly_report.s('adarsh@limelight.com', 'Monthly Report'),
    )


if __name__ == '__main__':
    app.run(debug=True)
