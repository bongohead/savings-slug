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

/* calendar.html */
class __TwigTemplate_285b331f26bd5d80ded7e1f3a1897fb7 extends Template
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
        $this->parent = $this->loadTemplate("base.html", "calendar.html", 1);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_staticlinks($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 3
        echo "\t<link rel=\"stylesheet\" href=\"static/calendar.css\" media=\"print\">
\t<link rel=\"stylesheet\" href=\"static/calendar.css\" media=\"screen\">
";
    }

    // line 7
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 8
        echo "<!-- Print wityh margins 0 top+bottom, .1 left+right-->
<div id=\"calendar\"></div>
";
    }

    public function getTemplateName()
    {
        return "calendar.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  61 => 8,  57 => 7,  51 => 3,  47 => 2,  36 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("{% extends \"base.html\" %}
{% block staticlinks %}
\t<link rel=\"stylesheet\" href=\"static/calendar.css\" media=\"print\">
\t<link rel=\"stylesheet\" href=\"static/calendar.css\" media=\"screen\">
{% endblock %}

{% block content %}
<!-- Print wityh margins 0 top+bottom, .1 left+right-->
<div id=\"calendar\"></div>
{% endblock %}", "calendar.html", "/var/www/budget.macrodawg.com/public/templates/calendar.html");
    }
}
