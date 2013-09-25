/**
 * Right Context Menu configuration
 *
 * Some usefull variables:
 *   node.hns = headpage id;
 *   node.isdir = node is namespace;
 *   node.dokuid = the DW id (namespace parent in case of headpage);
 *   id = the DW id of the selected node (headpage id in case of headpage);
 *   index.config.urlbase = Url Base;
 *   index.config.sepchar = Url separator;
 *
 * HOWTO EDIT:
 *
 * To override menu entries or add a menu entry:
 *  - PLEASE EDIT ONLY the scripts/contextmenu.local.js file
 *  - DON'T EDIT this file, it is overwritten at plugin update
 *
 * Base structure of the context menu is displayed below.
 * The entries with 'pg' are shown for page noded, these with 'ns' only for namespaces.
 *
 * Current available for everybody:
 *   indexmenu_contextmenu['all']['pg']['view'] = [...array with menu description here... ];
 *   indexmenu_contextmenu['all']['pg']['edit'] = [ ... ];
 *   indexmenu_contextmenu['all']['ns']['view'] = [ ... ];
 *
 * Current available for admins:
 *   indexmenu_contextmenu['pg']['view'] = [ ... ];
 *   indexmenu_contextmenu['ns']['view'] = [ ... ];
 *
 * Current available for admins:
 *   indexmenu_contextmenu['pg']['view'] = [ ... ];
 *   indexmenu_contextmenu['ns']['view'] = [ ... ];
 *
 * A menu description may contain four kind of entries:
 *  - section title: array with one entry e.g.:
 *      ['Section title (html allowed)']
 *  - menu action: array with two entries e.g.:
 *      ['Title of action 1 (html allowed)', 'javascript here ... see for examples scripts/contextmenu.js']
 *  - menu action with custom tooltip: array with three entries e.g.:
 *      ['Title of action 1 (html allowed)', 'javascript here ... see for examples scripts/contextmenu.js', 'Customized title']
 *  - submenu: array with two entries where second entry is an array that describes again a menu e.g.:
 *      ['title of submenu (html allowed)', [ ...array with menu actions... ]]
 *
 *
 *  Examples:
 *  A menu description array:
 *   ... = [
 *           ['section title'],
 *           ['title of action 1', 'javascript here'],
 *           ['title of submenu', [['title of subaction 1', 'javascript here'], ['title of subaction 1', 'javascript here', 'Click here for action']] ]
 *         ];
 *
 * To Override the common menu title:
 *  indexmenu_contextmenu['all']['pg']['view'][0] = ['customtitle'];
 *
 * To override a menu entry, for example the menu title:
 *   indexmenu_contextmenu['all']['pg']['view'][0] = ['Custom Title'];
 *
 * To add option to page menu:
 *   Array.splice(index, howManyToRemove, description1)
 *     index = position to start (start counting at zero)
 *     howManyToRemove = number of elements that are removed (set to 1 to replace a element)
 *     description1 = array with menu entry description
 *     -> optional: description2 = optional you can add more elements at once by splice(index, howManyToRemove, description1, description2, etc)
 *
 *   indexmenu_contextmenu['all']['pg']['view'].splice(1, 0, ['Input new page', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\');"']);
 */

// IMPORTANT: DON'T MODIFY THIS FILE, BUT EDIT contextmenu.local.js PLEASE!
// THIS FILE IS OVERWRITTEN WHEN PLUGIN IS UPDATED

/**
 * Right Context Menu configuration for all users:
 */
indexmenu_contextmenu['all']['pg'] = {
    'view': [
        ['<span class="indexmenu_titlemenu"><b>Page</b></span>'],
        ['Revisions', 'indexmenu_getid(index.config.urlbase,id)+"do=revisions"'],
        ['Toc preview', '"javascript: indexmenu_createTocMenu(\'call=indexmenu&req=toc&id="+id+"\',\'picker_"+index.obj+"\',\'s"+index.obj+node.id+"\');"']
    ],
    //Menu items in edit mode, when previewing
    'edit': [
        ['<span class="indexmenu_titlemenu"><b>Edit mode</b></span>'],
        ['Insert as DWlink', '"javascript: indexmenu_insertTags(\'"+id+"\',\'"+index.config.sepchar+"\');"+index.obj+".divdisplay(\'r\',0);"', 'Insert the link of this page in the edit box at cursor position']
    ]
};

indexmenu_contextmenu['all']['ns'] = {
    'view': [
        ['<span class="indexmenu_titlemenu"><b>Namespace</b></span>'],
        ['Search ...', '"javascript: indexmenu_srchpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.isdir+"\',\'"+node.dokuid+"\');"', 'Search for pages within this namespace']
    ]
};


if (JSINFO && JSINFO.isadmin) {
    /**
     * Right Context Menu configuration for admin users:
     */
    indexmenu_contextmenu['pg'] = {
        'view': [
            ['Edit', 'indexmenu_getid(index.config.urlbase,id)+"do=edit"'],
            ['<em>Create--></em>', [
                ['Headpage', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\',\'"+node.name+"\');"', 'Create a new headpage under this page'],
                ['Start page', 'indexmenu_getid(index.config.urlbase,id+index.config.sepchar+"start")+"do=edit"', 'Create a new start page under this page'],
                ['Custom page', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\');"', 'Create a new page under this page']
            ]],
            ['<em>More--></em>', [
                ['Acls', 'indexmenu_getid(index.config.urlbase,id)+"do=admin&page=acl"'],
                ['Purge cache', 'indexmenu_getid(index.config.urlbase,id)+"purge=true"'],
                ['Export as HTML', 'indexmenu_getid(index.config.urlbase,id)+"do=export_xhtml"'],
                ['Export as text', 'indexmenu_getid(index.config.urlbase,id)+"do=export_raw"']
            ]]
        ]
    };

    indexmenu_contextmenu['ns'] = {
        'view': [
            ['New page', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\');"', 'Create a new page inside this namespace'],
            ['<em>More--></em>', [
                ['Headpage here', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\',\'"+node.name+"\');"', 'Create a new headpage inside this namespace'],
                ['Acls', 'indexmenu_getid(index.config.urlbase,node.dokuid)+"do=admin&page=acl"']
            ]]
        ]
    };

} else if (JSINFO && JSINFO.isauth) {
    /**
     * Right Context Menu configuration for authenticated users:
     */
    indexmenu_contextmenu['pg'] = {
        'view': [
            ['New page here', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\');"'],
            ['Edit', 'indexmenu_getid(index.config.urlbase,id)+"do=edit"', 1, 0 ],
            ['<em>More--></em>', [
                ['Headpage here', '"javascript: indexmenu_reqpage(\'"+index.config.urlbase+"\',\'"+index.config.sepchar+"\',\'"+node.dokuid+"\',\'"+node.name+"\');"'],
                ['Purge cache', 'indexmenu_getid(index.config.urlbase,id)+"purge=true"'],
                ['Export as HTML', 'indexmenu_getid(index.config.urlbase,id)+"do=export_xhtml"']
            ]]
        ]
    };

}

/**
 * Common functions
 * Insert your custom functions (available for all users) here.
 */

function indexmenu_srchpage(u, s, isdir, nid) {
    var r = prompt("Insert keyword(s) to search for within this namespace", "");
    if (r) {
        var fnid = nid;
        if (isdir == "0") {
            fnid = fnid.substring(0, nid.lastIndexOf(s));
        }
        var b = u, re = new RegExp(s, 'g');
        fnid = fnid.replace(re, ":");
        b += (u.indexOf("?id=") < 0) ? '?id=' : '';
        window.location.href = indexmenu_getid(b, r + " @" + fnid) + "do=search";
    }
}

function indexmenu_getid(u, id) {
    var url = (u || '') + encodeURI(id || '');
    url += (u.indexOf("?") < 0) ? '?' : '&';
    return url;
}

function indexmenu_reqpage(b, s, id, n) {
    var r, u = b;
    if (n) {
        r = id + s + n;
    } else {
        r = prompt("Insert the pagename to create", "");
        if (!r) {
            return;
        }
        r = id + s + r;
    }
    if (r) window.location.href = indexmenu_getid(u, r) + "do=edit";
}
