# elsys_feeder

My preferred way of reading updates on [elsys-bg.org](https://elsys-bg.org/) through an rss feed.

The way elsys_feeder works is by scraping content from the website and serving it as the following rss feeds:

| URL                  | URL                                                         |
| -------------------- | ----------------------------------------------------------- |
| `/`                  | mixed feed with content from all the feeds.                 |
| `/news`              | <https://elsys-bg.org/novini-i-sybitija/novini/>            |
| `/blog`              | <https://elsys-bg.org/blog>                                 |
| `/excursions`        | <https://elsys-bg.org/uchenicheski-jivot/ekskurzii>         |
| `/inspiration_talks` | <https://elsys-bg.org/uchenicheski-jivot/inspiration-talks> |

It only returns the articles on the last page. As of right now, that page only contains the last 5 articles.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

See [LICENSE](./LICENSE) for more details.
