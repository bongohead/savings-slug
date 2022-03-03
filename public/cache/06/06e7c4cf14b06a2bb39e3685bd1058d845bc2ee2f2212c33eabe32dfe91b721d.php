<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* login.html */
class __TwigTemplate_4c9112f5bc85c7f35cbd55113a82e00798e46aa46c57a9c963ba51337136a616 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"en-US\">

<head>
    <meta http-equiv=Content-Type content=\"text/html; charset=utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>";
        // line 8
        echo twig_escape_filter($this->env, ($context["title"] ?? null));
        echo "</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
    <meta name=description content=\"Content.\" />
    <meta name=keywords content=\"keyword1 keyword2 keyword3 keyword4\" />
    
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://econforecasting.com/static/style-bs.css\">
\t<link rel=\"stylesheet\" type=\"text/css\" href=\"//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\">

\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/css/all.min.css\" integrity=\"sha512-f2MWjotY+JCWDlE0+QAshlykvZUtIm35A6RHwfYZPdxKgLJpL8B+VVxjpHJwZDsZaWdyHVhlIHoblFYGkmrbhg==\" crossorigin=\"anonymous\" />

\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap5.min.css\"/>

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
    <script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>

    ";
        // line 35
        echo ($context["pageJS"] ?? null);
        echo "

</head>

<body>
<header>
\t<div class=\"container-fluid\" style=\"height:.25rem;background-color:rgba(10, 24, 66,1);\"></div>    
</header>

<main>
\t<div class=\"pt-5 row gx-0 justify-content-center\" style=\"min-height:95vh;background-color: #ffffff;
background-image: url('/static/Liquid-Cheese.svg');
background-attachment: fixed;
background-size: cover;\">
\t\t<div class=\"col-auto\">
\t\t\t<!-- Form from https://getbootstrap.com/docs/4.0/examples/sign-in/ -->
\t\t\t<form class=\"px-5 py-4 m-5 border border-2 rounded\" style=\"background-color: rgba(255, 255, 255, .7)\">
\t\t\t\t<h1 class=\"h3 mb-3 font-weight-normal\">Please sign in</h1>
\t\t\t\t<div class=\"row\">
\t\t\t\t\t<img class=\"mb-4\" src=\"/static/slug.png\" alt=\"Savings Slug\" width=\"200\" height=\"200\">
\t\t\t\t</div>
\t\t\t\t<label for=\"inputEmail\" class=\"form-label\">Email address</label>
\t\t\t\t<input type=\"email\" id=\"inputEmail\" class=\"form-control mb-2 px-2\" placeholder=\"\" required=\"\" autofocus=\"\">
\t\t\t\t<label for=\"inputPassword\" class=\"form-label\">Password</label>
\t\t\t\t<input type=\"password\" id=\"inputPassword\" class=\"form-control mb-2 px-2\" placeholder=\"\" required=\"\">
\t\t\t\t<div class=\"checkbox mb-2\">
\t\t\t\t<label>
\t\t\t\t\t<input type=\"checkbox\" value=\"remember-me\"> Remember me
\t\t\t\t</label>
\t\t\t\t</div>
\t\t\t\t<div id=\"inputValid\" class=\"invalid-feedback mb-1\" style=\"display:none\">Error: Invalid Username or Password.</div>
\t\t\t\t<div class=\"d-grid gap-2\">
\t\t\t\t\t<button id=\"login-button\" class=\"btn btn-primary\" type=\"submit\">Sign in</button>
\t\t\t\t</div>
\t\t</form>
\t\t</div>
\t</div>
</main>

<footer class=\"container-fluid text-white px-0 bg-dark\">
\t  <!-- Grid container -->
\t  <div class=\"container py-3\">
\t\t<!--Grid row-->
\t\t<div class=\"row\">
\t\t  <!--Grid column-->
\t\t  <div class=\"col-6 mb-2 mb-md-0\">
\t\t\t<h5 class=\"text-uppercase\">Links</h5>
\t\t\t<ul class=\"list-unstyled mb-0\">
\t\t\t  <li>
\t\t\t\t<a href=\"https://charlesye.com\" class=\"text-white\">My Portfolio</a>
\t\t\t  </li>
\t\t\t</ul>
\t\t  </div>
\t\t  <!--Grid column-->

\t\t  <!--Grid column-->
\t\t  <div class=\"col-6 mb-2 mb-md-0 text-end\">
\t\t\t<h5 class=\"text-uppercase mb-0\">CONTACT</h5>

\t\t\t<ul class=\"list-unstyled\">
\t\t\t  <li>
\t\t\t\t<a href=\"mailto:charles@cmefi.com\" class=\"text-white\">Email: charles (at) cmefi (dotcom)</a>
\t\t\t  </li>
\t\t\t</ul>
\t\t  </div>
\t\t  <!--Grid column-->
\t\t</div>
\t\t<!--Grid row-->
\t  </div>
\t  <!-- Grid container -->

\t <!-- Copyright -->
\t<div class=\"container-fluid\" style=\"background-color: rgba(0, 0, 0, 0.2)\">
\t\t<div class=\"container text-end p-2\">
\t\t\t<span>© 2021 <img class=\"mx-1\" src=\"/static/slug2.png\" width=\"16\" height=\"16\"> Charles Ye</span>
\t\t</div>
\t</div>
\t <!-- Copyright -->
</footer>
        
        

\t<div class=\"overlay h-100\" id=\"overlay\" style=\"display:none\">
\t\t<div class=\"row h-25\">
\t\t\t<div class=\"\"></div>
\t\t</div>
\t\t<div class=\"row\">
\t\t\t<div class=\"text-center col-12\"><h4 style=\"text-align:center\" id=\"loadmessage\">Loading ...</h4></div>
\t\t</div>
\t\t<div class=\"row\">
\t\t\t<div class=\"sk-circle\">
\t\t\t\t<div class=\"sk-circle1 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle2 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle3 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle4 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle5 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle6 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle7 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle8 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle9 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle10 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle11 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle12 sk-child\"></div>
\t\t\t</div>
\t\t</div>
\t</div>




<script>
  ";
        // line 146
        echo ($context["bodyScript"] ?? null);
        echo "
</script>

</body>

</html>";
    }

    public function getTemplateName()
    {
        return "login.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  190 => 146,  76 => 35,  46 => 8,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en-US\">

<head>
    <meta http-equiv=Content-Type content=\"text/html; charset=utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>{{ title|e }}</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
    <meta name=description content=\"Content.\" />
    <meta name=keywords content=\"keyword1 keyword2 keyword3 keyword4\" />
    
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://econforecasting.com/static/style-bs.css\">
\t<link rel=\"stylesheet\" type=\"text/css\" href=\"//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\">

\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/css/all.min.css\" integrity=\"sha512-f2MWjotY+JCWDlE0+QAshlykvZUtIm35A6RHwfYZPdxKgLJpL8B+VVxjpHJwZDsZaWdyHVhlIHoblFYGkmrbhg==\" crossorigin=\"anonymous\" />

\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap5.min.css\"/>

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.10.24/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
    <script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>

    {{ pageJS | raw }}

</head>

<body>
<header>
\t<div class=\"container-fluid\" style=\"height:.25rem;background-color:rgba(10, 24, 66,1);\"></div>    
</header>

<main>
\t<div class=\"pt-5 row gx-0 justify-content-center\" style=\"min-height:95vh;background-color: #ffffff;
background-image: url('/static/Liquid-Cheese.svg');
background-attachment: fixed;
background-size: cover;\">
\t\t<div class=\"col-auto\">
\t\t\t<!-- Form from https://getbootstrap.com/docs/4.0/examples/sign-in/ -->
\t\t\t<form class=\"px-5 py-4 m-5 border border-2 rounded\" style=\"background-color: rgba(255, 255, 255, .7)\">
\t\t\t\t<h1 class=\"h3 mb-3 font-weight-normal\">Please sign in</h1>
\t\t\t\t<div class=\"row\">
\t\t\t\t\t<img class=\"mb-4\" src=\"/static/slug.png\" alt=\"Savings Slug\" width=\"200\" height=\"200\">
\t\t\t\t</div>
\t\t\t\t<label for=\"inputEmail\" class=\"form-label\">Email address</label>
\t\t\t\t<input type=\"email\" id=\"inputEmail\" class=\"form-control mb-2 px-2\" placeholder=\"\" required=\"\" autofocus=\"\">
\t\t\t\t<label for=\"inputPassword\" class=\"form-label\">Password</label>
\t\t\t\t<input type=\"password\" id=\"inputPassword\" class=\"form-control mb-2 px-2\" placeholder=\"\" required=\"\">
\t\t\t\t<div class=\"checkbox mb-2\">
\t\t\t\t<label>
\t\t\t\t\t<input type=\"checkbox\" value=\"remember-me\"> Remember me
\t\t\t\t</label>
\t\t\t\t</div>
\t\t\t\t<div id=\"inputValid\" class=\"invalid-feedback mb-1\" style=\"display:none\">Error: Invalid Username or Password.</div>
\t\t\t\t<div class=\"d-grid gap-2\">
\t\t\t\t\t<button id=\"login-button\" class=\"btn btn-primary\" type=\"submit\">Sign in</button>
\t\t\t\t</div>
\t\t</form>
\t\t</div>
\t</div>
</main>

<footer class=\"container-fluid text-white px-0 bg-dark\">
\t  <!-- Grid container -->
\t  <div class=\"container py-3\">
\t\t<!--Grid row-->
\t\t<div class=\"row\">
\t\t  <!--Grid column-->
\t\t  <div class=\"col-6 mb-2 mb-md-0\">
\t\t\t<h5 class=\"text-uppercase\">Links</h5>
\t\t\t<ul class=\"list-unstyled mb-0\">
\t\t\t  <li>
\t\t\t\t<a href=\"https://charlesye.com\" class=\"text-white\">My Portfolio</a>
\t\t\t  </li>
\t\t\t</ul>
\t\t  </div>
\t\t  <!--Grid column-->

\t\t  <!--Grid column-->
\t\t  <div class=\"col-6 mb-2 mb-md-0 text-end\">
\t\t\t<h5 class=\"text-uppercase mb-0\">CONTACT</h5>

\t\t\t<ul class=\"list-unstyled\">
\t\t\t  <li>
\t\t\t\t<a href=\"mailto:charles@cmefi.com\" class=\"text-white\">Email: charles (at) cmefi (dotcom)</a>
\t\t\t  </li>
\t\t\t</ul>
\t\t  </div>
\t\t  <!--Grid column-->
\t\t</div>
\t\t<!--Grid row-->
\t  </div>
\t  <!-- Grid container -->

\t <!-- Copyright -->
\t<div class=\"container-fluid\" style=\"background-color: rgba(0, 0, 0, 0.2)\">
\t\t<div class=\"container text-end p-2\">
\t\t\t<span>© 2021 <img class=\"mx-1\" src=\"/static/slug2.png\" width=\"16\" height=\"16\"> Charles Ye</span>
\t\t</div>
\t</div>
\t <!-- Copyright -->
</footer>
        
        

\t<div class=\"overlay h-100\" id=\"overlay\" style=\"display:none\">
\t\t<div class=\"row h-25\">
\t\t\t<div class=\"\"></div>
\t\t</div>
\t\t<div class=\"row\">
\t\t\t<div class=\"text-center col-12\"><h4 style=\"text-align:center\" id=\"loadmessage\">Loading ...</h4></div>
\t\t</div>
\t\t<div class=\"row\">
\t\t\t<div class=\"sk-circle\">
\t\t\t\t<div class=\"sk-circle1 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle2 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle3 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle4 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle5 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle6 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle7 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle8 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle9 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle10 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle11 sk-child\"></div>
\t\t\t\t<div class=\"sk-circle12 sk-child\"></div>
\t\t\t</div>
\t\t</div>
\t</div>




<script>
  {{ bodyScript |raw }}
</script>

</body>

</html>", "login.html", "/var/www/budget.macrodawg.com/public/templates/login.html");
    }
}
