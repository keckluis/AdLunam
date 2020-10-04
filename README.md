# AD LUNAM
Repository für die PRIMA Abgabe 
Luis Keck (256153)

[GAME](https://keckluis.github.io/AdLunam/AdLunam/Build/index.html)

[CONCEPT](https://github.com/keckluis/AdLunam/tree/master/AdLunam/Concept)

[SOURCE CODE](https://github.com/keckluis/AdLunam/tree/master/AdLunam/SourceCode)

[Gepacktes Archiv](https://github.com/keckluis/AdLunam/tree/master/AdLunam/Gepacktes_Archiv)

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | AD LUNAM
|    | Name                  | Luis Keck
|    | Matrikelnummer        |  256153
|  1 | Nutzerinteraktion     | Der Nutzer kann die Spielfigur mit Hilfe von Tastatureingaben bewegen. Auswirkung dieser Interaktion ist zum einen das Bewegen der Spielfigur, also laufen und springen und das Einsetzen zuvor eingesammelter Items.|
|  2 | Objektinteraktion     | Kollisionsprüfung findet zu verschiedenen Zwecken statt. Zum einen gibt es die Prüfung zwischen Charakteren, wie z.B. der Spielfigur oder Gegnern und den Plattformen auf denen sich diese bewegen. Die Kollisionsprüfung dient hier dazu einen Boden zu erzeugen der den ständigen Fall der Figuren zum Halt bringt. Andere Kollisionsprüfung finden zwischen der Spielfigur und Gegnern oder Items auf den Plattformen statt. Bei Kollision mit dem Spieler wird entweder das Spielende oder das Einsammeln des Items ausgelöst. Die letzte Kollisionsprüfung findet zwischen den Laserschüssen den Blaster-Items und den Gegnern statt. Trifft ein Schuss den Gegner, wird dessen Tod ausgelöst.|
|  3 | Objektanzahl variabel | Die Objekte die in variabler Anzahl erstellt werden sind die Plattformen, Items und Gegner. Die Erzeugung dieser beginnt in der Level Klasse in der während der Laufzeit ein zufälliges Level generiert wird. Gemessen an der horizontalen Distanz die der Spieler bereits zurückgelegt hat, werden neue Instanzen des Plattform Objekts erstellt. Dies geschieht frühzeitig genug, sodass das Erstellen immer außerhalb des Viewports geschieht. Die Plattform erhält eine zufällige Höhe und einen zufälligen Abstand zur Plattform links von ihr. Ist der Sprung sehr weit und/oder hoch bekommt die vorherige Plattform noch das Jetpack-Item, das einen Doppelsprung möglich macht. Jede Plattform hat außerdem noch eine Chance ein zufälliges Item zu bekommen, und sollte sie keins haben noch eine Chance, dass sich ein Gegner auf ihr befindet.|
|  4 | Szenenhierarchie      | Der Hauptknoten "Game" ist Parent aller anderen Knoten. Seine direkten Children sind die Hauptknoten der Anwendung wie die Kamera, die Spielfigur, die Hintergrundverwaltung, das Level und ein Containerknoten für alle während der Spielzeit erstellten Laserschüsse, die dann Children des Containerknoten sind. Der Knoten "BackgroundHandler" ist Parent von drei "Background" Knoten die drei verschiedene Hintergründe darstellen. "Level" ist Parent einer beliebigen Anzahl von Plattformen, die wiederum Parent von einem Gegner und/oder einem Item seien können. Ein Diagramm, dass die Knoten-Struktur darstellt ist im Konzept-Ordner zu finden.|
|  5 | Sound                 | Mit dem Start des Spiels (nach dem Menü) beginnt die Hintergrundmusik die im Loop abgespielt wird. Verschiedene Aktionen des Spielers lösen dann zusätzliche Sounds aus. Dazu gehören Springen, Aufsammeln von Items, Droppen von Items, Einsetzen des Blasters und Einsetzen des Jetpacks. Der Tod eines Gegners wird auch durch einen Sound unterstützt. Außerdem gibt es einen Feedbacksound beim Spielende, also beim Tod der Spielfigur. Kurz bevor dieser zu hören ist stoppt die Musik.|
|  6 | GUI                   | Das GUI liefert eine kurze Anleitung wie man den Vollbildmodus startet. Außerdem ist durchgängig am unteren Bildschirmrand eine Steuerungsanleitung zu sehen. Mit Enter startet der Nutzer das Spiel. Mit der Taste "M" lässt sich der Ton aus- und wieder einschalten.|
|  7 | Externe Daten         | Da das Level zufällig generiert wird und keine feste Größe hat, ist es nicht nötig dieses aus externen Daten zu laden. Stattdessen werden nun die Daten die für die Generierung von Sprites nötig sind in einer .json gespeichert und von dort aus während der Laufzeit geladen. Hierbei handelt es sich um die Position des Sprites auf dem Spritesheet, seine Größe, die Anzahl der Frames, die Skalierung und natürlich der Name, um es zuordnen zu können. Abgesehen von Plattform und Hintergrund, werden alle Sprites in der Klasse "SpriteGenerator" geladen und den Klassen "Astronaut", "Alien", "Item" und "Bullet" zugeordnet.|
|  8 | Verhaltensklassen     | Die meisten Klassen sind verantwortlich für die Erscheinung und das Verhalten der sichtbaren Objekte im Spiel. Dazu gehören z.B. "Astronaut" die das Verhalten der Spielerfigur beschreibt, "Alien" die das Verhalten der Gegner beschreibt und "Bullet", "Item", "Platform" und "Background", die Instanzen dieser Objekte erzeugen. Bei "Platform" und "Background" gibt es noch den Sonderfal, dass deren Parents "Level" und "BackgroundHandler", mehrere Instanzen dieser verwalten. "BackgroundHandler" verwaltelt drei Instanzen von "Background", wobei jede Instanz einen anderen Hintergrund darstellt. "BackgroundHandler" sorgt dafür, dass der linkeste Hintergrund immer nach rechts gesetzt wird, sobald er nicht mehr im Bild ist. Dadurch wird ein unendlicher wirkender Hintergrund erzeugt. "Level" erstellt Instanen von "Platform" um das zufällig generierte Level zu generieren. Außerdem entfernt "Level" Instanzen von "Platform" die nicht mehr benötigt werden.|
|  9 | Subklassen            |Die Klassen "Astronaut" und "Alien" erben beide von der Klasse "Character" in der gemeinsame Eigenschaften wie Gravity- und Geschwindigkeitsvariablen, sowie Methoden wie checkCollision() festgelegt sind. Sowohl "Character" als auch "Item" und "Bullet" erben von der Klasse "HitboxObject", die alle Objekte beschreibt die ein Hitbox aus der Klasse "Hitbox" besitzen.|
| 10 | Maße & Positionen     | Die Spielfigur, die Kamera, die Hintergründe und das Level befinden sich alle im gleichen lokalen Koordinatensystem. Das Spiel startet immer im Ursprung, sodass die Positionen der Objekte immer direkt miteinander verglichen werden können. Gegner und Items hingegen haben ihren Ursprung auf der Plattform der sie untergeordet sind, da sie an diese gebunden sind und ein Vergleich mit anderen Objekten nicht nötig ist. Bei der Definition von Plattformabstand und -höhe werden ganzalige Werte verwendet, die dann im Konstruktor von "Platform" umgerechnet werden, um nachvollziehbare Werte zu haben, sollte man Verhalten kontrollieren wollen oder Level von Hand gestalten.|
| 11 | Event-System          | Das Eventsystem wird hauptsächlich zur Input-Abfrage verwendet. "keydown" und "keyup" werden von Control.ts abgefangen und weiter verarbeitet, um die Interaktion des Nutzers mit der Anwendung zu ermöglichen. Außerdem wird das Fudge-Event fudge.EVENT.LOOP_FRAME verwendet um die verschiedenen Update-Methoden in den Klassen auszulösen.|
