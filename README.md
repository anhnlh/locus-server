# locus-server
A backend server written in **Node.js** to handle database queries to a **MongoDB** cluster, serving the **[Vitri](https://github.com/mindcat/bigredhacks)** mobile app.

## API endpoints
- **POST /uploadLocation**: inserts a location document (JSON) to the database
- **GET /getAllLocations**: retrieves all location documents in the database
- **POST /upsertLocation**: updates/inserts a location document to the database

## Libraries
- **Express**: minimal server library
- **MongoDB Driver for Node.js**: provides APIs to authenticate and query the database

## Future Plans
- Retire the **/uploadLocation** endpoint since upsert exists and solves the problem the Vitri app has.
