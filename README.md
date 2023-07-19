
# Backend API submission roxiler

1) Once the server is started it checks for the Data. If it is present in DB or not.
2) Checks if data is present in the Database.
    i) Not present : Fetches the Data from API and seeds the Databse 
    ii) Present : Continues without any excess calls. 
3) Groups data according to months, price ranges and categories
4) Has a special call that can get you the data from all the three end points at once.

## Run Locally

Clone the project

```bash
  git clone https://github.com/okpiyush/roxilerapi.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get stats a desired month
Gets you the monthly statistics of sold and unsold items

```http
  GET /api/order/stats/${month}
```

#### Get Bar Chart Data 
Gets you statistics of products grouped by various price ranges.

```http
  GET /api/order/bar
```

#### Get Pie Chart Data
Gets you statistics of products grouped by various Categories.

```http
  GET /api/order/pie
```


#### Get ALL

Gets you the data from all the three end points at once.
The Month is for the selective data in which month is required.
```http
  GET /api/order/all/${month}
```

