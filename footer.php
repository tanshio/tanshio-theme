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

<script id="data-list" type="application/json">
<?php
$url = null;
if (is_single()) {
  $url = site_url()."/wp-json/wp/v2/posts?_embed&slug=".$post->post_name;
}
$result = file_get_contents($url);
echo $result;
?>
</script>

<script src="<?php echo get_template_directory_uri() . '/dist/build.js'; ?>"></script>
<?php wp_footer(); ?>

</body>
</html>
