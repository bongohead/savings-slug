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
class __TwigTemplate_25fd9ca99668e751fba75a71a9132f3abff563a92b584ab0b5a45fd6ffc373e1 extends \Twig\Template
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
\t\t\t<span class=\"align-bottom\">List of Budgets</span>
\t\t\t<button id=\"add-budget-open\" class=\"btn btn-sm btn-success\" type=\"submit\"><span class=\"fas fa-plus me-2\">Add New Budget</button>
\t\t</h3>
\t\t<div class=\"col-12 overflow-scroll\">
\t\t\t<div id=\"budget-container\" class=\"d-flex\">
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t</div>
\t\t</div>
\t</div>
</div>

<section class=\"container\">
\t<!--<div class=\"row justify-content-center\">
\t\t<div class=\"col-xl-8 col-lg-10 col-12-md px-2\" id=\"accounts-chart-div\"></div>
\t</div>-->
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<table class=\"border-bottom\" id=\"accounts-table\"></table>
\t\t</div>
\t</div>
\t<div class=\"row justify-content-center my-4\">
\t
\t\t<div class=\"col-6\">
\t\t\t<div class=\"d-grid gap-2\">
\t\t\t  <button class=\"btn btn-success\" type=\"button\" id=\"add-account-open\">Add New Account</button>
\t\t\t</div>
\t\t</div>
\t</div>

</section>



<!-- Edit Account Modal -->
<div class=\"modal fade\" id=\"edit-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Edit Account Information</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">ID:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-id\" placeholder=\"1\" disabled>
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Budget Name:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-name\" placeholder=\"Enter Name for Budget\">
\t\t\t\t\t</div>

\t\t\t\t\t<div>
\t\t\t\t\t
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"edit-account-submit\" type=\"button\">Submit</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>


<!-- Add Budget Modal -->
<div class=\"modal fade\" id=\"add-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered modal-lg\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">New Budget Information</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t<span class=\"input-group-text\">Budget Name:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"add-account-name\" placeholder=\"Enter Account Name Here\">
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<div class=\"row justify-content-center my-2\">
\t\t\t\t\t\t<div class=\"col-12\">
\t\t\t\t\t\t\t<table id=\"add-budget-table\" class=\"border-bottom w-100\"></table>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t\t\t\t
\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-account-submit\" type=\"button\">Submit</button>
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
\t\t\t<span class=\"align-bottom\">List of Budgets</span>
\t\t\t<button id=\"add-budget-open\" class=\"btn btn-sm btn-success\" type=\"submit\"><span class=\"fas fa-plus me-2\">Add New Budget</button>
\t\t</h3>
\t\t<div class=\"col-12 overflow-scroll\">
\t\t\t<div id=\"budget-container\" class=\"d-flex\">
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t\t<div class=\"card card-body\">Card</div>
\t\t\t</div>
\t\t</div>
\t</div>
</div>

<section class=\"container\">
\t<!--<div class=\"row justify-content-center\">
\t\t<div class=\"col-xl-8 col-lg-10 col-12-md px-2\" id=\"accounts-chart-div\"></div>
\t</div>-->
\t<div class=\"row justify-content-center my-2\">
\t\t<div class=\"col-auto\">
\t\t\t<table class=\"border-bottom\" id=\"accounts-table\"></table>
\t\t</div>
\t</div>
\t<div class=\"row justify-content-center my-4\">
\t
\t\t<div class=\"col-6\">
\t\t\t<div class=\"d-grid gap-2\">
\t\t\t  <button class=\"btn btn-success\" type=\"button\" id=\"add-account-open\">Add New Account</button>
\t\t\t</div>
\t\t</div>
\t</div>

</section>



<!-- Edit Account Modal -->
<div class=\"modal fade\" id=\"edit-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Edit Account Information</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">ID:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-id\" placeholder=\"1\" disabled>
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Budget Name:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-name\" placeholder=\"Enter Name for Budget\">
\t\t\t\t\t</div>

\t\t\t\t\t<div>
\t\t\t\t\t
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"edit-account-submit\" type=\"button\">Submit</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>


<!-- Add Budget Modal -->
<div class=\"modal fade\" id=\"add-budget-modal\" tabindex=\"-1\">
\t<div class=\"modal-dialog modal-dialog-centered modal-lg\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">New Budget Information</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t<span class=\"input-group-text\">Budget Name:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"add-account-name\" placeholder=\"Enter Account Name Here\">
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<div class=\"row justify-content-center my-2\">
\t\t\t\t\t\t<div class=\"col-12\">
\t\t\t\t\t\t\t<table id=\"add-budget-table\" class=\"border-bottom w-100\"></table>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>

\t\t\t\t\t\t\t
\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-account-submit\" type=\"button\">Submit</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>


{% endblock %}", "budget.html", "/var/www/budget.macrodawg.com/public/templates/budget.html");
    }
}
