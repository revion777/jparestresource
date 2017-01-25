#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright 2017 slavb.
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
package ${groupId}.web;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author slavb
 */
@Path("heartbeat")
public class Heartbeat {

    @PersistenceContext(unitName = "${parentArtifactId}")
    private EntityManager em;

    @GET
    @Transactional
    public String heartbeat() {
        em.createNativeQuery("SELECT 1").getFirstResult();
        return "OK";
    }

}
