package main

import (
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

const (
	host     = "127.0.0.1"
	port     = 5432
	user     = "postgres"
	password = "root"
	dbname   = "tempest"
)

func Db() (DB *sqlx.DB) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	DB, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	} else {
		fmt.Println("Successfully connected!")
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	} else {
		fmt.Println("Successfully pinged!")
	}
	return DB
}
