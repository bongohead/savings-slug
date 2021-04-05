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

/* base.html */
class __TwigTemplate_e52fec9a3898517f99edb6a646425eb3e8cd81509151c61faca22ebd09e5727a extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'staticlinks' => [$this, 'block_staticlinks'],
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<!DOCTYPE html>
<html lang=\"en-US\">

<head>
\t<meta charset=\"utf-8\">
\t<meta name=\"robots\" content=\"index, follow\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>";
        // line 9
        echo twig_escape_filter($this->env, ($context["title"] ?? null));
        echo "</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
\t
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://econforecasting.com/static/style-bs.css\">

\t<!--<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6\" crossorigin=\"anonymous\">-->
\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/css/all.min.css\" integrity=\"sha512-f2MWjotY+JCWDlE0+QAshlykvZUtIm35A6RHwfYZPdxKgLJpL8B+VVxjpHJwZDsZaWdyHVhlIHoblFYGkmrbhg==\" crossorigin=\"anonymous\" />

\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap5.min.css\"/>

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
    <script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>
\t\t
    ";
        // line 34
        echo ($context["pageJS"] ?? null);
        echo "

    ";
        // line 36
        $this->displayBlock('staticlinks', $context, $blocks);
        // line 37
        echo "</head>

<body>
<header>
\t<div class=\"container-fluid\" style=\"height:.25rem;background-color:black;\"></div>     
\t<nav class=\"navbar navbar-expand-md navbar-dark sticky-top\">
\t\t<div class=\"container-fluid\">
\t\t\t<a class=\"navbar-brand\" href=\"/\">
\t\t\t\t<img src=\"/static/slug3.png\" class=\"py-0\" height=\"30\" width=\"100\"></img>
\t\t\t</a>
\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsingNavbarLg\"><span class=\"navbar-toggler-icon\"></span></button>

\t\t\t<div class=\"navbar-collapse collapse\" id=\"collapsingNavbarLg\">
\t\t\t\t<ul class=\"navbar-nav\">
\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t<a class=\"nav-link\" href=\"/accounts\"><span class=\"fas fa-piggy-bank me-2\"></span>Accounts Summary</a>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"nav-item dropdown\">
\t\t\t\t\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbar-detailed-accounts-label\" data-bs-toggle=\"dropdown\">
\t\t\t\t\t\t\t<span class=\"fas fa-stream me-2\"></span>Detailed Accounts
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<div class=\"dropdown-menu\" id=\"navbar-detailed-accounts\">
\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">Accounts Summary</a>
\t\t\t\t\t\t</div>
\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t\t

\t\t\t\t</ul>
\t\t\t</div>
\t\t</div>
\t</nav>
</header>
    
<main>
\t<div class=\"row gx-0\">
\t\t<nav id=\"sidebar\" class=\"sidebar col-lg-auto d-none d-lg-block px-0 py-2 bg-light\"> <!-- Hide Sidebar for XS and S Devices -->
\t\t\t<div class=\"nav flex-column\">
\t\t\t\t<a href=\"#account-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t<div>
\t\t\t\t\t\t<span class=\"fas fa-hiking\"></span> 
\t\t\t\t\t\t<span class=\"ps-2\">My Account</span>
\t\t\t\t\t\t<span class=\"fas fa-caret-down ms-1\"></span>
\t\t\t\t\t</div>
\t\t\t\t</a>
\t\t\t\t<div id='account-links' class=\"sidebar-submenu\">
\t\t\t\t\t<a class=\"text-truncate\" href=\"/accounts\">
\t\t\t\t\t\t<span class=\"fas fa-piggy-bank\"></span><span class=\"ps-2\">Accounts Summary</span>
\t\t\t\t\t</a>
\t\t\t\t\t<a class=\"text-truncate\" href=\"/error\">
\t\t\t\t\t\t<span class=\"fas fa-search-dollar\"></span><span class=\"ps-2\">Monthly Budget (WIP)</span>
\t\t\t\t\t</a>
\t\t\t\t\t<a class=\"text-truncate\" href=\"/login\">
\t\t\t\t\t\t<span class=\"fas fa-power-off\"></span><span class=\"ps-2\">Log Out</span>
\t\t\t\t\t</a>
\t\t\t\t</div>
\t\t\t\t
\t\t\t\t<a href=\"#transactions-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t<div>
\t\t\t\t\t\t<span class=\"fas fa-bars\"></span> 
\t\t\t\t\t\t<span class=\"ps-2\">Add Transactions</span>
\t\t\t\t\t\t<span class=\"fas fa-caret-down ms-1\"></span>
\t\t\t\t\t</div>
\t\t\t\t</a>

\t\t\t\t<div id='transactions-links' class=\"show sidebar-submenu\"> <!-- Switch show to collapse to hide ond efault\"
\t\t\t\t\t<!--<a class=\"list-group-item list-group-item-action\" href=\"/transactions\"><span>Transactions 1</span></a>-->
\t\t\t\t</div>\t\t\t\t
\t\t\t</ul>
\t\t\t</div>
\t\t</nav>
\t\t<div class=\"col\">
\t\t\t";
        // line 108
        $this->displayBlock('content', $context, $blocks);
        // line 110
        echo "\t\t</div>
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
        // line 185
        echo ($context["bodyScript"] ?? null);
        echo "
</script>

</body>

</html>";
    }

    // line 36
    public function block_staticlinks($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    // line 108
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 109
        echo "\t\t\t";
    }

    public function getTemplateName()
    {
        return "base.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  256 => 109,  252 => 108,  246 => 36,  236 => 185,  159 => 110,  157 => 108,  84 => 37,  82 => 36,  77 => 34,  49 => 9,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en-US\">

<head>
\t<meta charset=\"utf-8\">
\t<meta name=\"robots\" content=\"index, follow\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>{{ title|e }}</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
\t
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://econforecasting.com/static/style-bs.css\">

\t<!--<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6\" crossorigin=\"anonymous\">-->
\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.6.3/css/all.min.css\" integrity=\"sha512-f2MWjotY+JCWDlE0+QAshlykvZUtIm35A6RHwfYZPdxKgLJpL8B+VVxjpHJwZDsZaWdyHVhlIHoblFYGkmrbhg==\" crossorigin=\"anonymous\" />

\t<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.10.23/css/dataTables.bootstrap5.min.css\"/>

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
    <script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>
\t\t
    {{ pageJS | raw }}

    {% block staticlinks %}{% endblock %}
</head>

<body>
<header>
\t<div class=\"container-fluid\" style=\"height:.25rem;background-color:black;\"></div>     
\t<nav class=\"navbar navbar-expand-md navbar-dark sticky-top\">
\t\t<div class=\"container-fluid\">
\t\t\t<a class=\"navbar-brand\" href=\"/\">
\t\t\t\t<img src=\"/static/slug3.png\" class=\"py-0\" height=\"30\" width=\"100\"></img>
\t\t\t</a>
\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsingNavbarLg\"><span class=\"navbar-toggler-icon\"></span></button>

\t\t\t<div class=\"navbar-collapse collapse\" id=\"collapsingNavbarLg\">
\t\t\t\t<ul class=\"navbar-nav\">
\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t<a class=\"nav-link\" href=\"/accounts\"><span class=\"fas fa-piggy-bank me-2\"></span>Accounts Summary</a>
\t\t\t\t\t</li>
\t\t\t\t\t<li class=\"nav-item dropdown\">
\t\t\t\t\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbar-detailed-accounts-label\" data-bs-toggle=\"dropdown\">
\t\t\t\t\t\t\t<span class=\"fas fa-stream me-2\"></span>Detailed Accounts
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<div class=\"dropdown-menu\" id=\"navbar-detailed-accounts\">
\t\t\t\t\t\t\t<a class=\"dropdown-item\" href=\"#\">Accounts Summary</a>
\t\t\t\t\t\t</div>
\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t\t

\t\t\t\t</ul>
\t\t\t</div>
\t\t</div>
\t</nav>
</header>
    
<main>
\t<div class=\"row gx-0\">
\t\t<nav id=\"sidebar\" class=\"sidebar col-lg-auto d-none d-lg-block px-0 py-2 bg-light\"> <!-- Hide Sidebar for XS and S Devices -->
\t\t\t<div class=\"nav flex-column\">
\t\t\t\t<a href=\"#account-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t<div>
\t\t\t\t\t\t<span class=\"fas fa-hiking\"></span> 
\t\t\t\t\t\t<span class=\"ps-2\">My Account</span>
\t\t\t\t\t\t<span class=\"fas fa-caret-down ms-1\"></span>
\t\t\t\t\t</div>
\t\t\t\t</a>
\t\t\t\t<div id='account-links' class=\"sidebar-submenu\">
\t\t\t\t\t<a class=\"text-truncate\" href=\"/accounts\">
\t\t\t\t\t\t<span class=\"fas fa-piggy-bank\"></span><span class=\"ps-2\">Accounts Summary</span>
\t\t\t\t\t</a>
\t\t\t\t\t<a class=\"text-truncate\" href=\"/error\">
\t\t\t\t\t\t<span class=\"fas fa-search-dollar\"></span><span class=\"ps-2\">Monthly Budget (WIP)</span>
\t\t\t\t\t</a>
\t\t\t\t\t<a class=\"text-truncate\" href=\"/login\">
\t\t\t\t\t\t<span class=\"fas fa-power-off\"></span><span class=\"ps-2\">Log Out</span>
\t\t\t\t\t</a>
\t\t\t\t</div>
\t\t\t\t
\t\t\t\t<a href=\"#transactions-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t<div>
\t\t\t\t\t\t<span class=\"fas fa-bars\"></span> 
\t\t\t\t\t\t<span class=\"ps-2\">Add Transactions</span>
\t\t\t\t\t\t<span class=\"fas fa-caret-down ms-1\"></span>
\t\t\t\t\t</div>
\t\t\t\t</a>

\t\t\t\t<div id='transactions-links' class=\"show sidebar-submenu\"> <!-- Switch show to collapse to hide ond efault\"
\t\t\t\t\t<!--<a class=\"list-group-item list-group-item-action\" href=\"/transactions\"><span>Transactions 1</span></a>-->
\t\t\t\t</div>\t\t\t\t
\t\t\t</ul>
\t\t\t</div>
\t\t</nav>
\t\t<div class=\"col\">
\t\t\t{% block content %}
\t\t\t{% endblock %}
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

</html>", "base.html", "/var/www/budget.macrodawg.com/public/templates/base.html");
    }
}
