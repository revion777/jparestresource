/*
 * Copyright 2016 slavb.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package ru.ilb.jparestresource.repositories;

import javax.persistence.QueryHint;
import org.eclipse.persistence.config.HintValues;
import org.eclipse.persistence.config.QueryHints;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import ru.ilb.jparestresource.model.Document;

/**
 *
 * @author slavb
 */
@Transactional
public interface DocumentRepository extends JpaRepository<Document, Long> {

    /**
     * Только для примера
     * Не работает передача даты параметром, нужно пользоваться через EntityManager 
     * или реализовать https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.custom-implementations
     * @param id
     * @return 
     */
    @org.springframework.data.jpa.repository.QueryHints(value = {
        @QueryHint(name = QueryHints.AS_OF, value = "2017-04-11 10:00:00")
        ,
    @QueryHint(name = QueryHints.MAINTAIN_CACHE, value = HintValues.FALSE)
        ,
    @QueryHint(name = QueryHints.READ_ONLY, value = HintValues.TRUE)},
            forCounting = false)
    @Query("Select d From Document d where d.id=:id")
    Document getOnDate(@Param("id") Long id/*, @Param("onDate") String onDate*/);

}
