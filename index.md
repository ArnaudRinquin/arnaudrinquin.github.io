---
layout: page
title: Arnaud Rinquin's home page
tagline: yet another dev blog
---
{% include JB/setup %}

Here are my latest articles:

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
