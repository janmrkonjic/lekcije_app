package com.example.vaja1be.dao;

import com.example.vaja1be.vao.Lekcija;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LekcijaJpaDao implements Dao<Lekcija> {

    @Autowired
    private LekcijaDao lekcijaDao;

    @Override
    public Lekcija get(long id) {
        return lekcijaDao.findById(id).orElse(null);
    }

    @Override
    public List<Lekcija> getAll() {
        return lekcijaDao.findAll();
    }

    @Override
    public void save(Lekcija lekcija) {
        lekcijaDao.save(lekcija);
    }

    @Override
    public void delete(long id) {
        lekcijaDao.deleteById(id);
    }

    // Metoda za iskanje
    public List<Lekcija> searchLekcije(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAll();
        }
        return lekcijaDao.searchLekcije(query.trim());
    }
}