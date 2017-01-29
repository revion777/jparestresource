# migration from multi-module pom

1. remove <parent></parent>, add <groupId></groupId>
2. merge parent and -api pom.xml
3. copy schemas from api
4. remove -api dependency
5. delete parent pom.xml and -api project
6. rename project, check all 3 checkboxes, remove -web part. optionally move to parent: svn mv * ..
7. example separate client jar generation
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.0.2</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                        <configuration>
                            <classifier>client</classifier>
                            <includes>
                                <include>**/api/*</include>
                                <include>**/model/*</include>
                            </includes>
                        </configuration>
                    </execution>
                </executions>
            </plugin>            

