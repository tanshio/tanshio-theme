<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package tanshio
 */

get_header(); ?>

<script id="data-list" type="application/json">
[<?php
$result = file_get_contents("http://tanshio.dev/wp-json/wp/v2/posts/".get_the_ID().'?_embed');
echo $result;
?>
]</script>
<?php
get_footer();
