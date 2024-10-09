import Drafts from './contentstack.dev';
import Published from './contentstack.prod';
import * as ContentstackUtils from  'contentstack'  

interface Link {
    title: string;
    url: string;
}

interface Header {
    topMenuLinks: Link[];
    mainMenuLinks: Link[];
    cta: Link;
}

interface CTASection {
    title: string;
    subtitle: string;
    cta: Link
}

interface LinksSection {
    title: string;
    links: Link[];
}

interface LinksSectionContainer {
    title: string;
    sections: LinksSection[];
}

interface Footer {
    ctaSection: CTASection;
    linksSections: LinksSectionContainer[];
    legalLinks: Link[];
    copyright: string;
}

interface SiteSettings {
    header: Header;
    footer: Footer;
}

const Contentstack = process.env.NODE_ENV !== 'production' ? Drafts : Published;

export async function getArticleByUrl(url: string): Promise<any> {
    const page = await Contentstack.getElementBySlug('article', url);

    if (page) {
        return convertPage(page);
    }

    return null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const siteSettings = await Contentstack.getSingleElementByType('site_settings');
    const { header, footer } = siteSettings;

    return {
        header: {
            topMenuLinks: header?.top_menu_links || [],
            mainMenuLinks: header?.main_menu_links || [],
            cta: header?.cta || null,
        },
        footer: {
            ctaSection: footer.cta_section,
            linksSections: footer.links_sections,
            legalLinks: footer.legal_links,
            copyright: footer.copyright
        }
    }
}

const renderOption = {
    // to render Supercharged RTE NodeType content like paragraph, link, table, order list, un-order list and more.
    p: (node, next) => {
      return `<p class='class-id'>${next(node.children)}</p>`
    },
    h1: (node, next) => {
      return `<h1 class='class-id'>${next(node.children)}</h1>`
    },
    // to render Supercharged RTE MarkType content like bold, italic, underline, strikethrough, inlineCode, subscript, and superscript
    bold: (text) => {
      return `<b>${text}</b>`
    },
    // to render block-type embedded items
    block: {
      product: (entry, metadata) => {
        return `<div>
          <h2 >${entry.title}</h2>
          <img src=${entry.product_image.url} alt=${entry.product_image.title}/>
          <p>${entry.price}</p>
        </div>`
      },
      // to render the default
      $default: (entry, metadata) => {
        return `<div>
                   <h2>${entry.title}</h2>
                   <p>${entry.description}</p>  
               </div>`
      }
    },
    // to display inline embedded items
    inline: {
      $default: (entry) => {
        return `<span><b>${entry.title}</b> - ${entry.description}</span>`
      }
    },
    // to display embedded items inserted via link
    link: (entry, metadata) => {
      return `<a href="${metadata.attributes.href}">${metadata.text}</a>`
    },
    // to display assets
     display: (asset, metadata) => {
      return `<img src=${asset.url || metadata.attributes.src || metadata.attributes['asset-link']} alt=${metadata.alt}/>`
    }
}

export async function getLandingPage(): Promise<any> {
    const page = await Contentstack.getElement("blta135005fa8d23ccf", "pot_landing_page");

    if (page) {
        return convertPage(page);
    }

    return convertPage(page);
}

export async function getPageBySlug(slug: string): Promise<any> {
    const page = await Contentstack.getElementBySlug('page', slug);

    if (page) {
        return convertPage(page);
    }

    return null;
}

export async function getBlogPostBySlug(slug: string): Promise<any> {
    const page = await Contentstack.getElementBySlug('blog_post', slug);

    if (page) {
        return convertBlogPost(page);
    }

    return null;
}

function convertBlogPost(blogPost: any) {
    return {
        _id: blogPost.uid,
        title: blogPost.title,
        image: blogPost.image,
        author: blogPost.author,
        content: blogPost.content,
    }
}

function convertPage(page: any) {
    return {
        _id: page.uid,
        title: page.title,
        content: page.content,
        components: page.components?.map((section: any) => {
            const type = Object.keys(section)[0];
            return convertSection({
                type,
                ...section[type]
            });
        })
    }
}

function convertSection(section: any) {
    if (section.type === 'features_section') {
        section.type = 'FeaturesSection';

        section.features = section.features.map((feature: any) => {
            return {
                title: feature.feature_title,
                subtitle: feature.feature_subtitle,
                image: feature.icon.url
            };
        });
    }
    return section;
}

export async function getBlogPosts(): Promise<any[]> {
    const blogPosts = await Contentstack.getElementsByType('blog_post');

    return blogPosts;
}

