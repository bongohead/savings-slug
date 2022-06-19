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

/* error.html */
class __TwigTemplate_32d2b7c7afd161cef163a3e3f413cef80d3ab22190834e3c62fc6fc3edf7d4fb extends Template
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
        $this->parent = $this->loadTemplate("base.html", "error.html", 1);
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
<pre class=\"p-5\">
        THIS PAGE IS A WORK IN PROGRESS    
\t\t
</pre>

<pre class=\"p-5 image\">

\t\t
     |\\_/|                  
     | o o   Woof Woof
     |   <>              _  
     | \\_/\\/--_______ ((| |))
     \\               `--' |   
  ____|  _____    __|  |_.' 
 /_/____/    /___/_____|


</pre>
";
    }

    public function getTemplateName()
    {
        return "error.html";
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

<pre class=\"p-5\">
        THIS PAGE IS A WORK IN PROGRESS    
\t\t
</pre>

<pre class=\"p-5 image\">

\t\t
     |\\_/|                  
     | o o   Woof Woof
     |   <>              _  
     | \\_/\\/--_______ ((| |))
     \\               `--' |   
  ____|  _____    __|  |_.' 
 /_/____/    /___/_____|


</pre>
{% endblock %}", "error.html", "/var/www/budget.macrodawg.com/public/templates/error.html");
    }
}
