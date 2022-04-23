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

/* expenses.html */
class __TwigTemplate_35afb0706addda86a81fb91c28902786 extends Template
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
        $this->parent = $this->loadTemplate("base.html", "expenses.html", 1);
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


<section class=\"container\">
\t<div class=\"row justify-content-center my-5\">
\t\t<div class=\"col-12\">
\t\t\t<div id=\"expenses-chart-container\"></div>
\t\t</div>
\t</div>

\t<hr>

\t
</section>



";
    }

    public function getTemplateName()
    {
        return "expenses.html";
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



<section class=\"container\">
\t<div class=\"row justify-content-center my-5\">
\t\t<div class=\"col-12\">
\t\t\t<div id=\"expenses-chart-container\"></div>
\t\t</div>
\t</div>

\t<hr>

\t
</section>



{% endblock %}", "expenses.html", "/var/www/budget.macrodawg.com/public/templates/expenses.html");
    }
}
