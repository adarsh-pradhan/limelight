from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin


db = SQLAlchemy()


class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users',
                         backref=db.backref('users', lazy='dynamic'))


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String, unique=True)
    # category = db.Column(db.String, unique=True)
    def __repr__(self):
        return f'<Sponsor {self.id}>'


class Influencer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    username = db.Column(db.String(120), nullable=False)
    niche = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    # ad_requests = db.relationship('AdRequest', backref='influencer', lazy=True)

    def __repr__(self):
        return f'<Influencer {self.name}>'


class AdRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaign.id'), nullable=False, index=True)
    # influencer_id = db.Column(db.Integer, db.ForeignKey('influencer.id'), nullable=False, index=True)
    sender_id = db.Column(db.String, nullable=False)
    receiver_id = db.Column(db.String, nullable=False)
    messages = db.Column(db.String, nullable=False)
    requirements = db.Column(db.String, nullable=False)
    payment_amount = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # e.g., Pending, Accepted, Rejected

    campaign = db.relationship('Campaign', backref='ad_requests')

    def __repr__(self):
        return f'<AdRequest {self.id}, Status: {self.status}>'


class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String, nullable=False)
    niche = db.Column(db.String, nullable=False)
    # date = db.Column(db.Date, nullable=False)
    budget = db.Column(db.Integer, nullable=False)
    goals = db.Column(db.String, nullable = False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    