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
class __TwigTemplate_4135d0e50b6d70cbc24baea66c1aad18 extends Template
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
    <meta charset=\"utf-8\">
    <meta name=\"robots\" content=\"index, follow\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>";
        // line 9
        echo twig_escape_filter($this->env, ($context["title"] ?? null));
        echo "</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
\t
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style-bs.css\">

\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\"/>

\t<!--<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css\"/>-->
\t<link rel=\"preload\" href=\"https://fonts.googleapis.com/css?family=Assistant\" as=\"style\">
\t<link rel=\"preload\" href=\"https://fonts.googleapis.com/css?family=Merriweather\" as=\"style\">
\t<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Assistant\">
\t<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Merriweather\">

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
   \t<script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>
\t";
        // line 36
        echo ($context["pageJS"] ?? null);
        echo "


    ";
        // line 39
        $this->displayBlock('staticlinks', $context, $blocks);
        // line 40
        echo "</head>

<body>
\t<header>
\t\t<nav class=\"navbar navbar-expand-md navbar-dark sticky-top pt-1\">
\t\t\t<div class=\"container-fluid\">
\t\t\t\t<a class=\"navbar-brand\" href=\"/\">
\t\t\t\t\t<img src=\"/static/slug3.png\" class=\"py-0\" height=\"35\" width=\"100\"></img>
\t\t\t\t</a>
\t\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsingNavbarLg\"><span class=\"navbar-toggler-icon\"></span></button>

\t\t\t\t<div class=\"navbar-collapse collapse\" id=\"collapsingNavbarLg\">
\t\t\t\t\t<ul class=\"navbar-nav\">
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/accounts\"><i class=\"bi bi-piggy-bank me-1\"></i>Accounts Summary</a>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item dropdown\">
\t\t\t\t\t\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbar-detailed-accounts-label\" data-bs-toggle=\"dropdown\">
\t\t\t\t\t\t\t\t<i class=\"bi bi-pencil me-1\"></i>Detailed Accounts
\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t<div class=\"dropdown-menu\" id=\"navbar-detailed-accounts\">
\t\t\t\t\t\t\t\t<div class=\"d-md-flex align-items-start justify-content-start\">
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div class=\"dropdown-divider\"></div>

\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/budget\"><i class=\"bi bi-wallet2 me-1\"></i>Monthly Budget</a>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/expenses\"><i class=\"bi bi-graph-up me-1\"></i>Expenses Summary</a>
\t\t\t\t\t\t</li>

\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t\t
\t\t\t\t
\t\t\t</div>
\t\t</nav>
\t</header>
    
\t<main>
\t\t<div class=\"row gx-0\" style=\"background-color:rgb(247, 252, 255)\">
\t\t\t<nav id=\"sidebar\" class=\"sidebar col-lg-auto d-none d-lg-block px-0 py-2 bg-white\"> <!-- Hide Sidebar for XS and S Devices -->
\t\t\t\t<div class=\"nav flex-column\">
\t\t\t\t\t<a href=\"#account-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t<i class=\"bi bi-person-video2\"></i>
\t\t\t\t\t\t\t<span class=\"ps-2\">My Account</span>
\t\t\t\t\t\t\t<i class=\"bi bi-caret-down-fill ms-1\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</a>
\t\t\t\t\t<div id='account-links' class=\"sidebar-submenu\">
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/accounts\">
\t\t\t\t\t\t\t<i class=\"bi bi-piggy-bank\"></i><span class=\"ps-2\">Accounts Summary</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/budget\">
\t\t\t\t\t\t\t<i class=\"bi bi-wallet2\"></i><span class=\"ps-2\">Monthly Budget</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/expenses\">
\t\t\t\t\t\t\t<i class=\"bi bi-graph-up\"></i><span class=\"ps-2\">Expense Graph</span>
\t\t\t\t\t\t</a>

\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/login\">
\t\t\t\t\t\t\t<i class=\"bi bi-power\"></i><span class=\"ps-2\">Log Out</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t</div>
\t\t\t\t\t<a href=\"#transactions-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t<i class=\"bi bi-coin\"></i>
\t\t\t\t\t\t\t<span class=\"ps-2\">Transactions</span>
\t\t\t\t\t\t\t<i class=\"bi bi-caret-down-fill ms-1\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</a>

\t\t\t\t\t<div id='transactions-links' class=\"show sidebar-submenu\"> <!-- Switch show to collapse to hide ond efault\"
\t\t\t\t\t\t<!--<a class=\"list-group-item list-group-item-action\" href=\"/transactions\"><span>Transactions 1</span></a>-->
\t\t\t\t\t</div>\t\t\t\t
\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t</nav>
\t\t\t<div class=\"col mx-2 pb-5\">
\t\t\t\t<div class=\"container-xxl\">
\t\t\t\t\t";
        // line 124
        $this->displayBlock('content', $context, $blocks);
        // line 126
        echo "\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</main>

\t<footer class=\"container-fluid text-white px-0 bg-dark\">
\t\t<div class=\"container py-3\">
\t\t\t<div class=\"row\">
\t\t\t\t<div class=\"col-6 mb-2 mb-md-0\">
\t\t\t\t\t<h5 class=\"text-uppercase\">Links</h5>
\t\t\t\t\t<ul class=\"list-unstyled mb-0\">
\t\t\t\t\t  <li>
\t\t\t\t\t\t<a href=\"https://charlesye.com\" class=\"text-white\">My Portfolio</a>
\t\t\t\t\t  </li>
\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t\t<div class=\"col-6 mb-2 mb-md-0 text-end\">
\t\t\t\t\t<h5 class=\"text-uppercase mb-0\">CONTACT</h5>
\t\t\t\t\t<ul class=\"list-unstyled\">
\t\t\t\t\t  <li>
\t\t\t\t\t\t<a href=\"mailto:charles@cmefi.com\" class=\"text-white\">Email: charles (at) cmefi (dotcom)</a>
\t\t\t\t\t  </li>
\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t\t<div class=\"container-fluid\" style=\"background-color: rgba(0, 0, 0, 0.2)\">
\t\t\t<div class=\"container text-end p-2\">
\t\t\t\t<span>© 2022 <img class=\"mx-1\" src=\"/static/slug2.png\" width=\"16\" height=\"16\"> Charles Ye</span>
\t\t\t</div>
\t\t</div>
\t</footer>
        
        
        
\t<div class=\"overlay h-100\" id=\"overlay\" style=\"display:none;color:var(--bs-dark)\">
\t\t<div class=\"row h-25\">
\t\t\t<div class=\"\"></div>
\t\t</div>
\t\t<div class=\"row justify-content-center\">
\t\t\t<div class=\"col-auto\"><h4>Loading</h4></div>
\t\t</div>\t\t
\t\t<div class=\"row justify-content-center\">
\t\t\t<div class=\"spinner-grow\" style=\"width: 6rem; height: 6rem;\" role=\"status\">
\t\t\t  <span class=\"visually-hidden\">Loading</span>
\t\t\t</div>
\t\t</div>
\t</div>


\t<script>
\t  ";
        // line 177
        echo ($context["bodyScript"] ?? null);
        echo "
\t</script>
\t
</body>

</html>
";
    }

    // line 39
    public function block_staticlinks($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    // line 124
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 125
        echo "\t\t\t\t\t";
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
        return array (  249 => 125,  245 => 124,  239 => 39,  228 => 177,  175 => 126,  173 => 124,  87 => 40,  85 => 39,  79 => 36,  49 => 9,  39 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("<!DOCTYPE html>
<html lang=\"en-US\">

<head>
    <meta charset=\"utf-8\">
    <meta name=\"robots\" content=\"index, follow\" />
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">

    <title>{{ title|e }}</title>
    <link rel=\"icon\" type=image/ico href=\"/static/favicon2.png\"/>
\t
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/static/style-bs.css\">

\t<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css\">
\t<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\"/>

\t<!--<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css\"/>-->
\t<link rel=\"preload\" href=\"https://fonts.googleapis.com/css?family=Assistant\" as=\"style\">
\t<link rel=\"preload\" href=\"https://fonts.googleapis.com/css?family=Merriweather\" as=\"style\">
\t<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Assistant\">
\t<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Merriweather\">

\t<script src=\"https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js\"></script>
\t<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\"></script>

\t<script src=\"https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js\"></script>
\t
\t<script src=\"https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js\"></script>
\t<script src=\"https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js\"></script> <!-- HTML export buttons -->
\t\t
   \t<script src=\"//code.highcharts.com/stock/highstock.js\"></script>
\t
\t<script src=\"https://cmefi.github.io/gradient.js/gradient-min.js\"></script>
\t{{ pageJS | raw }}


    {% block staticlinks %}{% endblock %}
</head>

<body>
\t<header>
\t\t<nav class=\"navbar navbar-expand-md navbar-dark sticky-top pt-1\">
\t\t\t<div class=\"container-fluid\">
\t\t\t\t<a class=\"navbar-brand\" href=\"/\">
\t\t\t\t\t<img src=\"/static/slug3.png\" class=\"py-0\" height=\"35\" width=\"100\"></img>
\t\t\t\t</a>
\t\t\t\t<button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#collapsingNavbarLg\"><span class=\"navbar-toggler-icon\"></span></button>

\t\t\t\t<div class=\"navbar-collapse collapse\" id=\"collapsingNavbarLg\">
\t\t\t\t\t<ul class=\"navbar-nav\">
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/accounts\"><i class=\"bi bi-piggy-bank me-1\"></i>Accounts Summary</a>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item dropdown\">
\t\t\t\t\t\t\t<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbar-detailed-accounts-label\" data-bs-toggle=\"dropdown\">
\t\t\t\t\t\t\t\t<i class=\"bi bi-pencil me-1\"></i>Detailed Accounts
\t\t\t\t\t\t\t</a>
\t\t\t\t\t\t\t<div class=\"dropdown-menu\" id=\"navbar-detailed-accounts\">
\t\t\t\t\t\t\t\t<div class=\"d-md-flex align-items-start justify-content-start\">
\t\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t<div class=\"dropdown-divider\"></div>

\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/budget\"><i class=\"bi bi-wallet2 me-1\"></i>Monthly Budget</a>
\t\t\t\t\t\t</li>
\t\t\t\t\t\t<li class=\"nav-item\">
\t\t\t\t\t\t\t<a class=\"nav-link\" href=\"/expenses\"><i class=\"bi bi-graph-up me-1\"></i>Expenses Summary</a>
\t\t\t\t\t\t</li>

\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t\t
\t\t\t\t
\t\t\t</div>
\t\t</nav>
\t</header>
    
\t<main>
\t\t<div class=\"row gx-0\" style=\"background-color:rgb(247, 252, 255)\">
\t\t\t<nav id=\"sidebar\" class=\"sidebar col-lg-auto d-none d-lg-block px-0 py-2 bg-white\"> <!-- Hide Sidebar for XS and S Devices -->
\t\t\t\t<div class=\"nav flex-column\">
\t\t\t\t\t<a href=\"#account-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t<i class=\"bi bi-person-video2\"></i>
\t\t\t\t\t\t\t<span class=\"ps-2\">My Account</span>
\t\t\t\t\t\t\t<i class=\"bi bi-caret-down-fill ms-1\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</a>
\t\t\t\t\t<div id='account-links' class=\"sidebar-submenu\">
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/accounts\">
\t\t\t\t\t\t\t<i class=\"bi bi-piggy-bank\"></i><span class=\"ps-2\">Accounts Summary</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/budget\">
\t\t\t\t\t\t\t<i class=\"bi bi-wallet2\"></i><span class=\"ps-2\">Monthly Budget</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/expenses\">
\t\t\t\t\t\t\t<i class=\"bi bi-graph-up\"></i><span class=\"ps-2\">Expense Graph</span>
\t\t\t\t\t\t</a>

\t\t\t\t\t\t<a class=\"text-truncate\" href=\"/login\">
\t\t\t\t\t\t\t<i class=\"bi bi-power\"></i><span class=\"ps-2\">Log Out</span>
\t\t\t\t\t\t</a>
\t\t\t\t\t</div>
\t\t\t\t\t<a href=\"#transactions-links\" data-bs-toggle=\"collapse\" class=\"nav-link\">
\t\t\t\t\t\t<div>
\t\t\t\t\t\t\t<i class=\"bi bi-coin\"></i>
\t\t\t\t\t\t\t<span class=\"ps-2\">Transactions</span>
\t\t\t\t\t\t\t<i class=\"bi bi-caret-down-fill ms-1\"></i>
\t\t\t\t\t\t</div>
\t\t\t\t\t</a>

\t\t\t\t\t<div id='transactions-links' class=\"show sidebar-submenu\"> <!-- Switch show to collapse to hide ond efault\"
\t\t\t\t\t\t<!--<a class=\"list-group-item list-group-item-action\" href=\"/transactions\"><span>Transactions 1</span></a>-->
\t\t\t\t\t</div>\t\t\t\t
\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t</nav>
\t\t\t<div class=\"col mx-2 pb-5\">
\t\t\t\t<div class=\"container-xxl\">
\t\t\t\t\t{% block content %}
\t\t\t\t\t{% endblock %}
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t</main>

\t<footer class=\"container-fluid text-white px-0 bg-dark\">
\t\t<div class=\"container py-3\">
\t\t\t<div class=\"row\">
\t\t\t\t<div class=\"col-6 mb-2 mb-md-0\">
\t\t\t\t\t<h5 class=\"text-uppercase\">Links</h5>
\t\t\t\t\t<ul class=\"list-unstyled mb-0\">
\t\t\t\t\t  <li>
\t\t\t\t\t\t<a href=\"https://charlesye.com\" class=\"text-white\">My Portfolio</a>
\t\t\t\t\t  </li>
\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t\t<div class=\"col-6 mb-2 mb-md-0 text-end\">
\t\t\t\t\t<h5 class=\"text-uppercase mb-0\">CONTACT</h5>
\t\t\t\t\t<ul class=\"list-unstyled\">
\t\t\t\t\t  <li>
\t\t\t\t\t\t<a href=\"mailto:charles@cmefi.com\" class=\"text-white\">Email: charles (at) cmefi (dotcom)</a>
\t\t\t\t\t  </li>
\t\t\t\t\t</ul>
\t\t\t\t</div>
\t\t\t</div>
\t\t</div>
\t\t<div class=\"container-fluid\" style=\"background-color: rgba(0, 0, 0, 0.2)\">
\t\t\t<div class=\"container text-end p-2\">
\t\t\t\t<span>© 2022 <img class=\"mx-1\" src=\"/static/slug2.png\" width=\"16\" height=\"16\"> Charles Ye</span>
\t\t\t</div>
\t\t</div>
\t</footer>
        
        
        
\t<div class=\"overlay h-100\" id=\"overlay\" style=\"display:none;color:var(--bs-dark)\">
\t\t<div class=\"row h-25\">
\t\t\t<div class=\"\"></div>
\t\t</div>
\t\t<div class=\"row justify-content-center\">
\t\t\t<div class=\"col-auto\"><h4>Loading</h4></div>
\t\t</div>\t\t
\t\t<div class=\"row justify-content-center\">
\t\t\t<div class=\"spinner-grow\" style=\"width: 6rem; height: 6rem;\" role=\"status\">
\t\t\t  <span class=\"visually-hidden\">Loading</span>
\t\t\t</div>
\t\t</div>
\t</div>


\t<script>
\t  {{ bodyScript |raw }}
\t</script>
\t
</body>

</html>
", "base.html", "/var/www/budget.macrodawg.com/public/templates/base.html");
    }
}
