<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html" charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="author" content="">

	<title>Petrolino</title>

	<link href="<?= base_url('assets/css/bootstrap.min.css') ?>" rel="stylesheet">
	<link href="<?= base_url('assets/css/bootstrap-responsive.min.css') ?>" rel="stylesheet">
	<link href="<?= base_url('assets/css/style.css') ?>" rel="stylesheet">

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
	<script src="<?= base_url('assets/js/bootstrap.min.js') ?>"></script>
	<script src="<?= base_url('assets/js/jcanvas.min.js') ?>"></script>
	<!--<script src="<?= base_url('assets/js/petrolino.js') ?>"></script> -->
	<script src="<?= base_url('assets/js/drawboard.js') ?>"></script>
	<script src="<?= base_url('assets/js/place.js') ?>"></script>
	<script src="<?= base_url('assets/js/transition.js') ?>"></script>
	<script src="<?= base_url('assets/js/main.js') ?>"></script>
	
</head>
<body>
    <div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<a class="brand" href="#">Petrolino</a>
				<ul class="nav">
					<li><a href="<?=site_url("welcome/");?>">Home</a></li>
					<li><a href="<?=site_url("welcome/draw/");?>">Draw</a></li>
					<li><a href="#">Upload</a></li>
					<li><a href="#">Help</a></li>
				</ul>
				 <button type="submit" class="btn btn-primary pull-right">Compile Arduino code</button>
			</div>
		</div>
	</div>
	<div class="container">
