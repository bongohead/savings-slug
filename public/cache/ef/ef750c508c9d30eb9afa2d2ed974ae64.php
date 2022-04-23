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

/* accounts.html */
class __TwigTemplate_8e320f00cfd70ecb6024694326fa03ff extends Template
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
        $this->parent = $this->loadTemplate("base.html", "accounts.html", 1);
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
        echo "<!--
\t<div class=\"alert alert-primary\" role=\"alert\">
\t  Existing personal budgeting programs (Mint, YNAB, etc.) rely on zero-cash-flow accounting systems, which are unreliable and do not allow for the flexibility of double-entry bookkeeping. Business budgeting programs (e.g. Quickbooks) typically use double-entry accounting but are unwieldy and convoluted for personal use.
\t  <hr>
\t  <b>This website aims to reconcile that difference by creating a smooth, easy-to-use double-entry accounting system for personal budgeting purposes.</b> To test it out on this demo account, click on one of the accounts below (e.g., \"Checking Account\"), and try adding a new transaction. 
\t</div>
-->
\t<div class=\"row g-0\">
\t\t<div class=\"col-12 px-0\">
\t\t\t\t<div class=\"card my-3 py-2 mx-0 rounded shadow-sm\">
\t\t\t\t\t<div class=\"card-body\">
\t\t\t\t\t\t<h3 class=\"text-center\">Account Balances</h3>
\t\t\t\t\t\t<h5 class=\"text-center\">Net Worth: <span class=\"text-success\" id=\"net-worth\"></span></h5>
\t\t\t\t\t\t<div class=\"col-xl-10 col-12-md mx-auto\" id=\"accounts-chart-div\"></div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t</div>
\t</div>



\t<div class=\"row g-0\">
\t\t<div class=\"col-lg-6 pe-lg-2 mb-3 col-md-12\">
\t\t\t<div class=\"card shadow-sm\"><div class=\"card-body\">
\t\t\t\t<div class=\"mb-2\"><span style=\"vertical-align:middle;font-size:1.3rem;\">ACCOUNT DATA</span></div>
\t\t\t\t<div class=\"row justify-content-center\">
\t\t\t\t\t<div class=\"col-auto\">
\t\t\t\t\t\t<table class=\"border-bottom\" id=\"accounts-table\"></table>
\t\t\t\t\t\t<hr>
\t\t\t\t\t\t<div class=\"d-grid gap-2\">
\t\t\t\t\t\t  <button class=\"btn btn-success\" type=\"button\" id=\"add-account-open\">Add New Account</button>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div></div>
\t\t</div>
\t\t<div class=\"col-md-12 col-lg-6\">
\t\t\t<div class=\"card shadow-sm\"><div class=\"card-body\" id=\"statistics-card\">
\t\t\t\t<div class=\"mb-2\"><span style=\"vertical-align:middle;font-size:1.3rem;\">STATISTICS</span></div>
\t\t\t</div></div>
\t\t</div>

\t\t
\t</div>


\t\t
\t\t
\t<!-- Edit Account Modal -->
\t<div class=\"modal fade\" id=\"edit-account-modal\" tabindex=\"-1\">
\t\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<form class=\"form\">
\t\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t\t<h5 class=\"modal-title\">Edit Account Information</h5>
\t\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">ID:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-id\" placeholder=\"1\" disabled>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Account Name:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-name\" placeholder=\"Account Name\">
\t\t\t\t\t\t</div>


\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Parent Account:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"edit-account-parent-id\"></select>
\t\t\t\t\t\t\t<span class=\"input-group-text\">Order:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"edit-account-rel-order\"></select>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Debit Effect on Balance:<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\"></span></span>
\t\t\t\t\t\t\t<div class=\"btn-group\" role=\"group\">
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"edit-account-debit-effect\" id=\"edit-account-debit-effect-1\" value=\"1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"edit-account-debit-effect-1\">Increases</label>
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"edit-account-debit-effect\" id=\"edit-account-debit-effect-2\" value=\"-1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"edit-account-debit-effect-2\">Decreases</label>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t<div class=\"form-check form-switch\">
\t\t\t\t\t\t  <input id=\"edit-account-is-open\" class=\"form-check-input\" type=\"checkbox\">
\t\t\t\t\t\t  <label class=\"form-check-label\" for=\"edit-account-is-open\">Account is Open to New Transactions</label>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"edit-account-submit\" type=\"button\">Submit</button>
\t\t\t\t\t</div>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>
\t
\t
\t<!-- Add Account Modal -->
\t<div class=\"modal fade\" id=\"add-account-modal\" tabindex=\"-1\">
\t\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<form class=\"form\">
\t\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t\t<h5 class=\"modal-title\">New Account Information</h5>
\t\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Account Name:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"add-account-name\" placeholder=\"Enter Account Name Here\">
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Parent Account:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"add-account-parent-id\"></select>
\t\t\t\t\t\t\t<span class=\"input-group-text\">Order:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"add-account-rel-order\">
\t\t\t\t\t\t\t\t<option value=\"1\">1</option>
\t\t\t\t\t\t\t</select>
\t\t\t\t\t\t</div>


\t\t\t\t\t\t<div class=\"input-group\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Debit Effect on Balance:<span class=\"fas fa-question-circle mx-1\"></span></span>
\t\t\t\t\t\t\t<div class=\"btn-group\" role=\"group\">
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"add-account-debit-effect\" id=\"add-account-debit-effect-1\" value=\"1\" autocomplete=\"off\" checked>
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"add-account-debit-effect-1\">Increases</label>
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"add-account-debit-effect\" id=\"add-account-debit-effect-2\" value=\"-1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"add-account-debit-effect-2\">Decreases</label>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t
\t\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-account-submit\" type=\"button\">Submit</button>
\t\t\t\t\t</div>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>


";
    }

    public function getTemplateName()
    {
        return "accounts.html";
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
<!--
\t<div class=\"alert alert-primary\" role=\"alert\">
\t  Existing personal budgeting programs (Mint, YNAB, etc.) rely on zero-cash-flow accounting systems, which are unreliable and do not allow for the flexibility of double-entry bookkeeping. Business budgeting programs (e.g. Quickbooks) typically use double-entry accounting but are unwieldy and convoluted for personal use.
\t  <hr>
\t  <b>This website aims to reconcile that difference by creating a smooth, easy-to-use double-entry accounting system for personal budgeting purposes.</b> To test it out on this demo account, click on one of the accounts below (e.g., \"Checking Account\"), and try adding a new transaction. 
\t</div>
-->
\t<div class=\"row g-0\">
\t\t<div class=\"col-12 px-0\">
\t\t\t\t<div class=\"card my-3 py-2 mx-0 rounded shadow-sm\">
\t\t\t\t\t<div class=\"card-body\">
\t\t\t\t\t\t<h3 class=\"text-center\">Account Balances</h3>
\t\t\t\t\t\t<h5 class=\"text-center\">Net Worth: <span class=\"text-success\" id=\"net-worth\"></span></h5>
\t\t\t\t\t\t<div class=\"col-xl-10 col-12-md mx-auto\" id=\"accounts-chart-div\"></div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t</div>
\t</div>



\t<div class=\"row g-0\">
\t\t<div class=\"col-lg-6 pe-lg-2 mb-3 col-md-12\">
\t\t\t<div class=\"card shadow-sm\"><div class=\"card-body\">
\t\t\t\t<div class=\"mb-2\"><span style=\"vertical-align:middle;font-size:1.3rem;\">ACCOUNT DATA</span></div>
\t\t\t\t<div class=\"row justify-content-center\">
\t\t\t\t\t<div class=\"col-auto\">
\t\t\t\t\t\t<table class=\"border-bottom\" id=\"accounts-table\"></table>
\t\t\t\t\t\t<hr>
\t\t\t\t\t\t<div class=\"d-grid gap-2\">
\t\t\t\t\t\t  <button class=\"btn btn-success\" type=\"button\" id=\"add-account-open\">Add New Account</button>
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div></div>
\t\t</div>
\t\t<div class=\"col-md-12 col-lg-6\">
\t\t\t<div class=\"card shadow-sm\"><div class=\"card-body\" id=\"statistics-card\">
\t\t\t\t<div class=\"mb-2\"><span style=\"vertical-align:middle;font-size:1.3rem;\">STATISTICS</span></div>
\t\t\t</div></div>
\t\t</div>

\t\t
\t</div>


\t\t
\t\t
\t<!-- Edit Account Modal -->
\t<div class=\"modal fade\" id=\"edit-account-modal\" tabindex=\"-1\">
\t\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<form class=\"form\">
\t\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t\t<h5 class=\"modal-title\">Edit Account Information</h5>
\t\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group input-group-sm mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">ID:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-id\" placeholder=\"1\" disabled>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Account Name:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"edit-account-name\" placeholder=\"Account Name\">
\t\t\t\t\t\t</div>


\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Parent Account:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"edit-account-parent-id\"></select>
\t\t\t\t\t\t\t<span class=\"input-group-text\">Order:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"edit-account-rel-order\"></select>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"input-group mb-2\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Debit Effect on Balance:<span class=\"fa fa-question-circle fa-fw ml-1 mr-1\"></span></span>
\t\t\t\t\t\t\t<div class=\"btn-group\" role=\"group\">
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"edit-account-debit-effect\" id=\"edit-account-debit-effect-1\" value=\"1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"edit-account-debit-effect-1\">Increases</label>
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"edit-account-debit-effect\" id=\"edit-account-debit-effect-2\" value=\"-1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"edit-account-debit-effect-2\">Decreases</label>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t<div class=\"form-check form-switch\">
\t\t\t\t\t\t  <input id=\"edit-account-is-open\" class=\"form-check-input\" type=\"checkbox\">
\t\t\t\t\t\t  <label class=\"form-check-label\" for=\"edit-account-is-open\">Account is Open to New Transactions</label>
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"edit-account-submit\" type=\"button\">Submit</button>
\t\t\t\t\t</div>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>
\t
\t
\t<!-- Add Account Modal -->
\t<div class=\"modal fade\" id=\"add-account-modal\" tabindex=\"-1\">
\t\t<div class=\"modal-dialog modal-dialog-centered\" role=\"document\">
\t\t\t<div class=\"modal-content\">
\t\t\t\t<form class=\"form\">
\t\t\t\t\t<div class=\"modal-header\">
\t\t\t\t\t\t<h5 class=\"modal-title\">New Account Information</h5>
\t\t\t\t\t\t<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-body\">
\t\t\t\t\t
\t\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Account Name:</span>
\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"add-account-name\" placeholder=\"Enter Account Name Here\">
\t\t\t\t\t\t</div>

\t\t\t\t\t\t<div class=\"input-group mb-3\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Parent Account:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"add-account-parent-id\"></select>
\t\t\t\t\t\t\t<span class=\"input-group-text\">Order:</span>
\t\t\t\t\t\t\t<select class=\"form-control form-select form-select-sm\" id=\"add-account-rel-order\">
\t\t\t\t\t\t\t\t<option value=\"1\">1</option>
\t\t\t\t\t\t\t</select>
\t\t\t\t\t\t</div>


\t\t\t\t\t\t<div class=\"input-group\">
\t\t\t\t\t\t\t<span class=\"input-group-text\">Debit Effect on Balance:<span class=\"fas fa-question-circle mx-1\"></span></span>
\t\t\t\t\t\t\t<div class=\"btn-group\" role=\"group\">
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"add-account-debit-effect\" id=\"add-account-debit-effect-1\" value=\"1\" autocomplete=\"off\" checked>
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"add-account-debit-effect-1\">Increases</label>
\t\t\t\t\t\t\t\t<input type=\"radio\" class=\"btn-check\" name=\"add-account-debit-effect\" id=\"add-account-debit-effect-2\" value=\"-1\" autocomplete=\"off\">
\t\t\t\t\t\t\t\t<label class=\"btn btn-outline-primary\" for=\"add-account-debit-effect-2\">Decreases</label>
\t\t\t\t\t\t\t</div>
\t\t\t\t\t\t</div>
\t\t\t\t\t\t\t\t
\t\t\t\t\t\t<div class=\"invalid-feedback mt-1\" style=\"color: #DC3545, font-size: .8rem\">Error Message!</div>
\t\t\t\t\t</div>
\t\t\t\t\t<div class=\"modal-footer\">
\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
\t\t\t\t\t\t<button class=\"btn btn-primary\" id=\"add-account-submit\" type=\"button\">Submit</button>
\t\t\t\t\t</div>
\t\t\t\t</form>
\t\t\t</div>
\t\t</div>
\t</div>


{% endblock %}", "accounts.html", "/var/www/budget.macrodawg.com/public/templates/accounts.html");
    }
}
