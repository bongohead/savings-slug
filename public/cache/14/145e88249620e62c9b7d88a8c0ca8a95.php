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

/* budget.html */
class __TwigTemplate_d864eab6a062d3607f10ef6c40d09ef3 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'staticlinks' => [$this, 'block_staticlinks'],
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 1
        return "base.html";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $this->parent = $this->loadTemplate("base.html", "budget.html", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_staticlinks($context, array $blocks = [])
    {
        $macros = $this->macros;
    }

    // line 6
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 7
        echo "


<div class=\"container\">
\t<div class=\"row justify-content-center py-2\">
\t\t<h3>
\t\t\t<h3 class=\"align-bottom\">Monthly Budget Planner</h3>
\t\t\t<button id=\"add-budget-open\" class=\"btn btn-success\" type=\"submit\"><span class=\"fas fa-plus me-1\"></span>Modify Monthly Budget</button>
\t\t</h3>
\t</div>
</div>
<hr>
<section class=\"container\">
\t<!--<div class=\"row justify-content-center\">
\t\t<div class=\"col-xl-8 col-lg-10 col-12-md px-2\" id=\"accounts-chart-div\"></div>
\t</div>-->
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<div class=\"btn-group btn-group-lg mb-3\">
\t\t\t\t<button id=\"active-month-back\" type=\"button\" class=\"btn btn-outline-secondary active-month-change\">
\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-arrow-left-square\" viewBox=\"0 0 16 16\">
\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z\"></path>
\t\t\t\t\t</svg>
\t\t\t\t\t<span class=\"visually-hidden\">Button</span>
\t\t\t\t</button>
\t\t\t\t<button type=\"button\" class=\"btn btn-outline-secondary\">
\t\t\t\t\t<span id=\"active-month\" class=\"font-size:2.0rem\">Active Month</span>
\t\t\t\t</button>
\t\t\t\t<button id=\"active-month-next\" type=\"button\" class=\"btn btn-outline-secondary active-month-change\">
\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-arrow-right-square\" viewBox=\"0 0 16 16\">
\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z\"></path>
\t\t\t\t\t</svg>
\t\t\t\t\t<span class=\"visually-hidden\">Button</span>
              </button>
            </div>
\t\t</div>
\t</div>
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<table class=\"border-bottom\" id=\"budget-table\"></table>
\t\t</div>
\t</div>

\t<hr>

\t
</section>



<!-- Modify Budget Modal -->
<div class=\"modal fade\" id=\"add-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered modal-lg\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Modify Monthly Budget</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>

\t\t\t\t\t<div class=\"row justify-content-center my-2\">
\t\t\t\t\t\t<div class=\"col-12 px-4\">
\t\t\t\t\t\t\t<table id=\"add-budget-table\" class=\"border-bottom w-100\"></table>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t\t\t\t
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-budget-submit\" type=\"button\">Submit</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>


";
    }

    public function getTemplateName()
    {
        return "budget.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  57 => 7,  53 => 6,  47 => 2,  36 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends \"base.html\" %}
{% block staticlinks %}
{% endblock %}


{% block content %}



<div class=\"container\">
\t<div class=\"row justify-content-center py-2\">
\t\t<h3>
\t\t\t<h3 class=\"align-bottom\">Monthly Budget Planner</h3>
\t\t\t<button id=\"add-budget-open\" class=\"btn btn-success\" type=\"submit\"><span class=\"fas fa-plus me-1\"></span>Modify Monthly Budget</button>
\t\t</h3>
\t</div>
</div>
<hr>
<section class=\"container\">
\t<!--<div class=\"row justify-content-center\">
\t\t<div class=\"col-xl-8 col-lg-10 col-12-md px-2\" id=\"accounts-chart-div\"></div>
\t</div>-->
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<div class=\"btn-group btn-group-lg mb-3\">
\t\t\t\t<button id=\"active-month-back\" type=\"button\" class=\"btn btn-outline-secondary active-month-change\">
\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-arrow-left-square\" viewBox=\"0 0 16 16\">
\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z\"></path>
\t\t\t\t\t</svg>
\t\t\t\t\t<span class=\"visually-hidden\">Button</span>
\t\t\t\t</button>
\t\t\t\t<button type=\"button\" class=\"btn btn-outline-secondary\">
\t\t\t\t\t<span id=\"active-month\" class=\"font-size:2.0rem\">Active Month</span>
\t\t\t\t</button>
\t\t\t\t<button id=\"active-month-next\" type=\"button\" class=\"btn btn-outline-secondary active-month-change\">
\t\t\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" class=\"bi bi-arrow-right-square\" viewBox=\"0 0 16 16\">
\t\t\t\t\t<path fill-rule=\"evenodd\" d=\"M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z\"></path>
\t\t\t\t\t</svg>
\t\t\t\t\t<span class=\"visually-hidden\">Button</span>
              </button>
            </div>
\t\t</div>
\t</div>
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<table class=\"border-bottom\" id=\"budget-table\"></table>
\t\t</div>
\t</div>

\t<hr>

\t
</section>



<!-- Modify Budget Modal -->
<div class=\"modal fade\" id=\"add-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered modal-lg\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Modify Monthly Budget</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>

\t\t\t\t\t<div class=\"row justify-content-center my-2\">
\t\t\t\t\t\t<div class=\"col-12 px-4\">
\t\t\t\t\t\t\t<table id=\"add-budget-table\" class=\"border-bottom w-100\"></table>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t\t\t\t
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-budget-submit\" type=\"button\">Submit</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>


{% endblock %}", "budget.html", "/var/www/budget.macrodawg.com/public/templates/budget.html");
    }
}
