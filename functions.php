<?php
/**
 * tanshio functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package tanshio
 */



function create_TOC( $data, $item, $request ) {

	$dom = new DOMDocument("1.0", "UTF-8");
	@$dom->loadHTML(mb_convert_encoding($item->post_content, 'HTML-ENTITIES', 'utf-8'));
	$xml = simplexml_import_dom($dom);
	// $json = json_encode($xml);
	// $dom_data = json_decode($json,true);
	$dom_data = $dom->getElementsByTagName('h2');
	foreach ($dom_data as $d) {
   $table_of_contents[] = trim($d->nodeValue);
	}

  $data->data['toc'] = $table_of_contents;
	return $data;
}
add_filter( 'rest_prepare_post', 'create_TOC', 10, 4 );

function delete_API_data( $data, $item, $request ) {
  $list = ['guid','status','type','link','expert','author','comment_status','ping_status','sticky','format','meta','_links','excerpt','categories',
  'tags','template','featured_media'];

  foreach ($list as $item) {
    unset($data->data[$item]);
  }

  // unset($data->data["_links"]);

  return $data;
}

add_filter( 'rest_prepare_post', 'delete_API_data', 10, 3 );
function get_posts_from_cat( $request ) {
	$cat = get_category_by_slug($request['slug']);

  if (!$cat) {
    return null;
  }

  $request['categories'] = $cat;

  $response = new WP_REST_Posts_Controller('post');
  $posts = $response->get_items($request);

  if ( empty( $posts ) ) {
  	return null;
  }

	return $posts;

}

add_action( 'rest_api_init', function () {
	register_rest_route( 'slug/v1', '/cat/(?P<slug>.*)', array(
		'methods' => 'GET',
		'callback' => 'get_posts_from_cat'

	) );
} );

function get_posts_from_tag( $request ) {
	$tags = get_tags(array('slug' => $request['slug']));

  if (!$tags) {
    return null;
  }

  $request['tags'] = $tags[0]->term_id;

  $response = new WP_REST_Posts_Controller('post');
  $posts = $response->get_items($request);

  if ( empty( $posts ) ) {
  	return null;
  }

	return $posts;

}

add_action( 'rest_api_init', function () {
	register_rest_route( 'slug/v1', '/tag/(?P<slug>.*)', array(
		'methods' => 'GET',
		'callback' => 'get_posts_from_tag'

	) );
} );

// delete
remove_action('wp_head', 'print_emoji_detection_script', 7 );
remove_action('wp_print_styles', 'print_emoji_styles', 10 );
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_print_styles',8);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'wp_shortlink_wp_head');


function delete_jquery() {
  // WordPress本体のjquery.jsを読み込まない
  wp_deregister_script('jquery');
}
add_action( 'wp_enqueue_scripts', 'delete_jquery' );

function remove_dns_prefetch( $hints, $relation_type ) {
    if ( 'dns-prefetch' === $relation_type ) {
        return array_diff( wp_dependencies_unique_hosts(), $hints );
    }
    return $hints;
}
add_filter( 'wp_resource_hints', 'remove_dns_prefetch', 10, 2 );



