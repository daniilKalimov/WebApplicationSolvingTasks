package com.example.spring.search;

import com.example.spring.model.Tasks;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.persistence.EntityManager;

import java.util.List;

@Service
public class TasksSearch  {

    @Autowired
    private  EntityManager entityManager ;

    public List<Tasks> search(String text) throws InterruptedException {

        SearchSession searchSession = Search.session( entityManager );
        MassIndexer indexer = searchSession.massIndexer( Tasks.class )
                .threadsToLoadObjects( 7);
        indexer.startAndWait();

        SearchResult<Tasks> result = searchSession.search(Tasks.class)
                .where(f -> f.match()
                        .fields("name","topic")
                        .matching(text))
                .fetch(20);

        long totalHitCount = result.total().hitCount();
        List<Tasks> hits = result.hits();
         return hits;
    }



}
