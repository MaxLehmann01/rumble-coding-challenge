<?php
  function rumble_news_feed_enqueue_scripts() {
    wp_enqueue_style(
      'rumble-news-feed-css',
      plugins_url('build/assets/index.css', __FILE__)
    );

    wp_enqueue_script(
      'rumble-news-feed-js',
      plugins_url('build/assets/index.js', __FILE__),
      array(),
      '1.0.0',
      true
    );
  }
  add_action('wp_enqueue_scripts', 'rumble_news_feed_enqueue_scripts');

  function rumble_news_feed_shortcode() {
    return '<div id="root"></div>';
  }
  add_shortcode('rumble_news_feed', 'rumble_news_feed_shortcode');
?>