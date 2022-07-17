import app
def save(response):

    data = app.Users(response)
    app.db.session.add(data)
    app.db.session.commit()
