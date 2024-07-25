from extensions import db
from flask_security import UserMixin, RoleMixin
from flask_security.models import fsqla_v3 as fsqla

fsqla.FsModels.set_db_info(db)

class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String)
    active = db.Column(db.Boolean)
    fs_uniquifier = db.Column(db.String(65), unique = True, nullable = False)
    roles = db.relationship('Role', secondary='user_roles')

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), unique = True)
    description = db.Column(db.String(255))

class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    

class Influencer(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.COlumn(db.String, unique = False, nullable = False)


class Ad_request(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    campaign_id = db.Column(db.Integer, db.Foreign Key('campaign.id')) #(Foreign Key to Campaign table)
    influencer_id db.Column(db.Integer, db.Foreign Key('influencer')) #(Foreign Key to Influencer/user table)
    messages = db.Column(db.String, nullable = False)
    requirements = db.Column(db.String, nullable = False)
    payment_amount = db.Column(db.Integer, nullable = False)
    status  = db.Column(db.String, nullable = False) #(Pending, Accepted, Rejected)


class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    start_date = db.Column(db.Date, nullable = False)
    end_date = db.Column(db.Date, nullable = False)
    budget = db.Column(db.Integer, nullable = False)
    visibility = db.Column(db.String, nullable = False) #(public, private)
    goals = db.Column(db.String, nullable = False)
    