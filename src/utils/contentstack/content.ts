import Drafts from './contentstack.dev';
import Published from './contentstack.prod';

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
        components: page.components.map((section: any) => {
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

