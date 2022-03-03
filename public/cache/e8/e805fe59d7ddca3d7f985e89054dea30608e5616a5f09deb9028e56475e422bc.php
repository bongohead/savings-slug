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

/* transactions.html */
class __TwigTemplate_d5ffdf99b57a6cc96a76f0287d5f50d2e8b85d31b26a8429b55c0c628fdaae74 extends Template
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
        $this->parent = $this->loadTemplate("base.html", "transactions.html", 1);
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
<section class=\"container-fluid\">
\t<div class=\"col-12 col-lg-8 col-xl-9 col-xxl-9 m-auto pt-0 px-2 pb-5\">
\t\t<div class=\"row justify-content-center my-3\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<h2><span id=\"account-name\">Account</span>: <span id=\"account-balance\" class=\"text-success\"></span></h2>
\t\t\t</div>
\t\t</div>
\t\t<div class=\"row justify-content-center my-1\">
\t\t\t<div class=\"col-lg-8 col-md-12\" id=\"transactions-chart-div\"></div>
\t\t</div>
\t\t<div class=\"row justify-content-center mt-5\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<h4>Transactions History</h4>
\t\t\t</div>
\t\t</div>

\t\t<div class=\"row justify-content-center my-2\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<table class=\"table\" style=\"width:100%\" id=\"transactions-table\"></table>
\t\t\t</div>
\t\t</div>
\t</div>

</section>

<!-- Add Edit Modal -->
<div class=\"modal fade\" id=\"edit-transaction-modal\" tabindex=\"-1\" role=\"dialog\">
\t<div class=\"modal-dialog modal-md modal-dialog-centered\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Edit Transaction</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Transaction #:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-transaction-id\" readonly>
\t\t\t\t\t\t<span class=\"input-group-text\">Transaction Date:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-transaction-date\">
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Description:</span>
\t\t\t\t\t\t<input type=\"text\"  class=\"form-control\" id=\"edit-transaction-description\"></input>
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Funds In/Out
\t\t\t\t\t\t\t<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\" data-bs-toggle=\"tooltip\" data-html=\"true\" title=\"Enter the dollar value of the funds entering this account; use negatives to represent funds exiting the account.\"></span>:
\t\t\t\t\t\t</span>
\t\t\t\t\t\t<input type=\"text\"  class=\"form-control\" id=\"edit-transaction-value\"></input>
\t\t\t\t\t</div>


\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Fund Source/Destination
\t\t\t\t\t\t\t<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\" data-bs-toggle=\"tooltip\" data-html=\"true\" title=\"Source of funds entering account; or destination of funds exiting account if funds in/out value is negative.\"></span>:
\t\t\t\t\t\t</span>
\t\t\t\t\t\t<select id=\"edit-transaction-other-account\" class=\"form-control form-select form-select-sm\">
\t\t\t\t\t\t</select>
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<p id=\"edit-transaction-debit-statement\" style=\"color: #DC3545, font-size: .8rem\"></p>

\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-danger\" id=\"edit-transaction-delete\" type=\"button\">Delete Transaction</button>
\t\t\t\t\t<button class=\"btn btn-success\" id=\"edit-transaction-submit\" type=\"button\">Submit Changes</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>

";
    }

    public function getTemplateName()
    {
        return "transactions.html";
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

<section class=\"container-fluid\">
\t<div class=\"col-12 col-lg-8 col-xl-9 col-xxl-9 m-auto pt-0 px-2 pb-5\">
\t\t<div class=\"row justify-content-center my-3\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<h2><span id=\"account-name\">Account</span>: <span id=\"account-balance\" class=\"text-success\"></span></h2>
\t\t\t</div>
\t\t</div>
\t\t<div class=\"row justify-content-center my-1\">
\t\t\t<div class=\"col-lg-8 col-md-12\" id=\"transactions-chart-div\"></div>
\t\t</div>
\t\t<div class=\"row justify-content-center mt-5\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<h4>Transactions History</h4>
\t\t\t</div>
\t\t</div>

\t\t<div class=\"row justify-content-center my-2\">
\t\t\t<div class=\"col-auto\">
\t\t\t\t<table class=\"table\" style=\"width:100%\" id=\"transactions-table\"></table>
\t\t\t</div>
\t\t</div>
\t</div>

</section>

<!-- Add Edit Modal -->
<div class=\"modal fade\" id=\"edit-transaction-modal\" tabindex=\"-1\" role=\"dialog\">
\t<div class=\"modal-dialog modal-md modal-dialog-centered\" role=\"document\">
\t\t<div class=\"modal-content\">
\t\t\t<form class=\"form\">
\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t<h5 class=\"modal-title\">Edit Transaction</h5>
\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-body\">
\t\t\t\t
\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Transaction #:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-transaction-id\" readonly>
\t\t\t\t\t\t<span class=\"input-group-text\">Transaction Date:</span>
\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-transaction-date\">
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Description:</span>
\t\t\t\t\t\t<input type=\"text\"  class=\"form-control\" id=\"edit-transaction-description\"></input>
\t\t\t\t\t</div>

\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Funds In/Out
\t\t\t\t\t\t\t<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\" data-bs-toggle=\"tooltip\" data-html=\"true\" title=\"Enter the dollar value of the funds entering this account; use negatives to represent funds exiting the account.\"></span>:
\t\t\t\t\t\t</span>
\t\t\t\t\t\t<input type=\"text\"  class=\"form-control\" id=\"edit-transaction-value\"></input>
\t\t\t\t\t</div>


\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t<span class=\"input-group-text\">Fund Source/Destination
\t\t\t\t\t\t\t<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\" data-bs-toggle=\"tooltip\" data-html=\"true\" title=\"Source of funds entering account; or destination of funds exiting account if funds in/out value is negative.\"></span>:
\t\t\t\t\t\t</span>
\t\t\t\t\t\t<select id=\"edit-transaction-other-account\" class=\"form-control form-select form-select-sm\">
\t\t\t\t\t\t</select>
\t\t\t\t\t</div>
\t\t\t\t\t
\t\t\t\t\t<p id=\"edit-transaction-debit-statement\" style=\"color: #DC3545, font-size: .8rem\"></p>

\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t</div>
\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
\t\t\t\t\t<button class=\"btn btn-danger\" id=\"edit-transaction-delete\" type=\"button\">Delete Transaction</button>
\t\t\t\t\t<button class=\"btn btn-success\" id=\"edit-transaction-submit\" type=\"button\">Submit Changes</button>
\t\t\t\t</div>
\t\t\t</form>
\t\t</div>
\t</div>
</div>

{% endblock %}
", "transactions.html", "/var/www/budget.macrodawg.com/public/templates/transactions.html");
    }
}
