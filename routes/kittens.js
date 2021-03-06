'use strict';
var express= require('express');
var router= express.Router();
var pg= require('pg');
var db_url= process.env.DATABASE_URL || 'postgres://localhost:5432/animals';

router.get("/", function(req, res){
//console.log("get something");
  pg.connect(db_url, function(err, client, done){
    done();
    if (err){
    return console.error( "err status", err);
    }
    client.query('SELECT * FROM kittens', function(err, data){
    if(err){
      return console.error("querying...", err);
    }
      res.render('kittens/index',{kittens: data.rows});
    });
  });
});
router.get('/new', function(req, res){
  res.render('kittens/new');
});
router.get('/:id', function(req, res){
  pg.connect(db_url, function(err, client, done){
    done();
    if(err){
      return console.error('error fetching from pool', err);
    }
    client.query('SELECT * FROM kittens WHERE id=$1', [req.params.id], function(err, data){
      //console.log(data);
      if(err){
        return console.error("querying..", err);
      }
      var kitten = data.rows[0];
      //console.log(kitten);
      if (!kitten) {
        res.redirect("/kittens");
      }
      res.render('kittens/show',  {kitten: kitten});
    });
  });
});
router.get('/:id/edit', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    done();
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM kittens WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      var kitten = data.rows[0];
      console.log(kitten);
      if (!kitten) {
        res.redirect("/kitten");
      }
      res.render('kittens/edit',  {kitten: kitten});
    });
  });
});

router.put('/:id', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    done();
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('UPDATE kittens SET name = $1 WHERE id = $2', [req.body.kitten.name,req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/kittens');
    });
  });
});

router.post('/', function(req, res) {
  pg.connect(db_url, function(err, client, done){
    done();
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO kittens (name) VALUES($1)', [req.body.kitten.name], function(err, data){

      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/kittens');
    });
  });
});

router.delete('/:id', function(req, res){
  pg.connect(db_url, function(err, client, done){
    done();
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('DELETE FROM kittens WHERE id = $1', [req.params.id], function(err, data){
      if(err) {
        return console.error('error querying database', err);
      }
      res.redirect('/kittens');
    });
  });
});

module.exports=router;
