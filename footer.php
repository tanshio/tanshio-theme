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

<script type="application/json" id="json-data">
<?php
$data = $response = new WP_REST_Posts_Controller('post');
$posts = $response->get_items($request);

echo json_encode($posts, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP); ?>
</script>

<script src="<?php echo get_template_directory_uri() . '/dist/build.js'; ?>"></script>
<?php wp_footer(); ?>

</body>
</html>
