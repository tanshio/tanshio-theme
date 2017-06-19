<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package tanshio
 */

?>
<?php
$ex_array = array(
  'text' => 'example_text',
  'url'   => 'https://memocarilog.info/'
);
?>



<?php
$postsJSON = [];
$restControllers = [];
$_GET['_embed'] = true;
// $restRequest = new WP_REST_Request();
// while (have_posts()) { the_post();
// if (!isset($restControllers[$post->post_type])) {
//   $restControllers[$post->post_type] = new WP_REST_Posts_Controller($post->post_type);
// }
//
// $preparedPost = $restControllers[$post->post_type]->prepare_item_for_response($post, $restRequest);
// $postsJSON[] = json_encode($preparedPost->data);
// unset( $_GET['_embed'] );
// $request = WP_REST_Request::from_url("http://tanshio.dev/wp-json/wp/v2/posts?page=2&per_page=5");
// $response = rest_do_request( $request );
$request = new WP_REST_Request();
// var_dump($request);
$response = rest_do_request( $request );
unset( $_GET['_embed'] );

// }
?>
<script id="data-posts" type="application/json">
<?php echo json_encode($response); ?>
</script>
<script src="<?php echo get_template_directory_uri() . '/dist/build.js'; ?>"></script>
<?php wp_footer(); ?>

</body>
</html>
