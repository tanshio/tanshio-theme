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
$result = file_get_contents("http://tanshio.dev/wp-json/wp/v2/posts?page=1&per_page=5&_embed");
echo $result;
?>
</script>

<script src="<?php echo get_template_directory_uri() . '/dist/build.js'; ?>"></script>
<?php wp_footer(); ?>

</body>
</html>
