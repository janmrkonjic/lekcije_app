package com.example.vaja1be.rest;

import com.example.vaja1be.dao.LekcijaJpaDao;
import com.example.vaja1be.vao.Lekcija;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lekcije")
@CrossOrigin(origins = "*")
public class LekcijeRestController {

    @Autowired
    private LekcijaJpaDao lekcijaJpaDao;

    @GetMapping
    public ResponseEntity<List<Lekcija>> getAllLekcije() {
        List<Lekcija> lekcije = lekcijaJpaDao.getAll();
        return ResponseEntity.ok(lekcije);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Lekcija>> searchLekcije(@RequestParam("q") String query) {
        List<Lekcija> rezultati = lekcijaJpaDao.searchLekcije(query);
        return ResponseEntity.ok(rezultati);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lekcija> getLekcija(@PathVariable Long id) {
        Lekcija lekcija = lekcijaJpaDao.get(id);
        if (lekcija == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lekcija);
    }

    @PostMapping
    public ResponseEntity<Lekcija> createLekcija(@RequestBody Lekcija lekcija) {
        lekcijaJpaDao.save(lekcija);
        return ResponseEntity.status(HttpStatus.CREATED).body(lekcija);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lekcija> updateLekcija(@PathVariable Long id, @RequestBody Lekcija lekcija) {
        Lekcija obstojecaLekcija = lekcijaJpaDao.get(id);
        if (obstojecaLekcija == null) {
            return ResponseEntity.notFound().build();
        }

        lekcija.setId(id);
        lekcijaJpaDao.save(lekcija);
        return ResponseEntity.ok(lekcija);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLekcija(@PathVariable Long id) {
        Lekcija lekcija = lekcijaJpaDao.get(id);
        if (lekcija == null) {
            return ResponseEntity.notFound().build();
        }

        lekcijaJpaDao.delete(id);
        return ResponseEntity.noContent().build();
    }
}