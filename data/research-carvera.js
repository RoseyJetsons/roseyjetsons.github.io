// Carvera Air CNC Machine Research Data
// Comprehensive guide to designing for CNC carving with the Carvera Air

module.exports = {
    id: 'carvera-air-research',
    title: 'Carvera Air: Complete Guide to CNC Carving',
    subtitle: 'Comprehensive analysis of design principles, software, and techniques for the Carvera Air desktop CNC machine',
    date: '2026-03-31',
    status: 'completed',
    categories: ['Research', 'Makerspace', 'CNC', 'Design'],
    
    abstract: `This research explores comprehensive design and manufacturing principles for the Carvera Air, a desktop 3-axis CNC machine designed for hobbyists and makers. With a work area of 30 × 20 × 13 cm, the Carvera Air is perfect for small-scale projects including jewelry, signs, chess pieces, and prototypes. The analysis covers core design principles including tool diameter constraints, corner radius limitations, and relief carving depths. Software recommendations include Makera CAM (included free), VCarve Pro ($370), Fusion 360 (free for hobbyists), and Easel (browser-based). The research provides practical guidance on material selection, speeds and feeds, and common beginner mistakes to avoid.`,
    
    methodology: `This research employed a multi-source approach combining official documentation, community resources, and practical CNC design principles:

1. **Official Documentation**: Analyzed Makera's technical specifications, user guides, and product documentation for the Carvera Air.

2. **Software Research**: Evaluated four CAM software options—Makera CAM, VCarve Pro, Fusion 360, and Easel—based on features, ease of use, cost, and suitability for the Carvera Air's capabilities.

3. **Community Analysis**: Reviewed user experiences on Reddit (r/Carvera), forums, and YouTube tutorials to identify common mistakes, best practices, and real-world performance.

4. **Technical Principles**: Applied established CNC design principles including tool diameter constraints, corner radius requirements, and material removal considerations.

5. **Material Research**: Surveyed material properties, cutting characteristics, and recommended parameters for woods, plastics, and soft metals.`,
    
    findings: [
        {
            title: 'Work Area Constraints',
            content: 'The Carvera Air offers a 30 × 20 × 13 cm work volume with 12 cm gantry clearance. Design with a 10-20mm safety margin for clamping, tool approach paths, and material irregularities. Perfect for jewelry, chess pieces, small signs, phone cases, and architectural models—not suitable for large furniture or full-size prototypes.'
        },
        {
            title: 'Corner Radius = Bit Radius',
            content: 'This is the #1 mistake beginners make. Internal corners will ALWAYS be rounded by the bit radius. A 6mm bit creates a 3mm radius corner; a 3mm bit creates a 1.5mm radius. Golden rule: internal corner radius should be at least 1/3 of cavity depth for clean cuts.'
        },
        {
            title: 'Minimum Feature Sizes',
            content: 'Minimum feature width = 1.5 × bit diameter. A 3mm bit can reliably cut 4.5mm features; a 1.5mm bit handles 2.25mm details. Wall thickness: 2-3mm for rough cuts, 1-1.5mm for fine detail, 0.5-1mm for delicate features (requires care).'
        },
        {
            title: 'Relief Carving Depths',
            content: 'Bas-relief (1-3mm) for subtle decoration; medium relief (3-10mm) for signs and plaques; high relief (10-20mm) for dramatic sculptures; through-cut for cutouts and puzzles. Engraving depth typically 0.025-0.25mm, maximum practical 3.5mm.'
        },
        {
            title: 'Material Hierarchy by Difficulty',
            content: 'Easy: Balsa, plywood, basswood, MDF. Medium: Cherry, poplar, acrylic. Hard: Maple, hard acrylic. Very Hard: Aluminum (12mm max), brass (6mm max), steel (3mm engraving only). Beginners should start with basswood or MDF using a 3mm end mill.'
        },
        {
            title: 'Software Options Compared',
            content: 'Makera CAM (free, included) — beginner-friendly, pre-configured, cloud-based. VCarve Pro ($370) — best for 2.5D carving and lettering. Fusion 360 (free for hobbyists) — full 3D CAD+CAM, industry standard, steeper learning curve. Easel (free/$20/mo) — easiest browser-based option with project library.'
        }
    ],
    
    recommendations: [
        {
            title: 'For Absolute Beginners',
            content: 'Start with Makera CAM (included free) and basswood or 12-18mm MDF. Use a 3mm (1/8") end mill at 8,000-10,000 RPM. Begin with simple projects: nameplates, basic shapes, shallow engraving. Always test on scrap material first. Watch Makera\'s YouTube tutorials.'
        },
        {
            title: 'For Sign Making & Lettering',
            content: 'Invest in VCarve Pro ($370) for its superior V-carving toolpaths and text tools. Design with generous corner radii. Use basswood or poplar for clean cuts. Typical sign depth: 3-6mm. Bas-relief lettering works beautifully at 1-2mm depth.'
        },
        {
            title: 'For 3D Models & Parts',
            content: 'Use Fusion 360 (free for hobbyists) for full 3D modeling and complex toolpaths. Consider grain direction in wood designs. Design for the 13cm Z-axis limit—split larger parts into sections. Add tabs to held cutouts to prevent parts from falling during cutting.'
        },
        {
            title: 'For Jewelry & Fine Detail',
            content: 'Use 1.5mm bits for details down to 2mm. Basswood is ideal—fine grain, easy to finish. Bas-relief at 1-3mm depth creates beautiful pendants and decorative pieces. Consider 4-axis upgrade for cylindrical items like rings and bracelets.'
        }
    ],
    
    specs: [
        { name: 'Work Area', value: '30 × 20 × 13 cm (11.8" × 7.9" × 5.1")' },
        { name: '4th Axis', value: '9.2 × 20 cm (3.6" × 7.9")' },
        { name: 'Gantry Clearance', value: '12 cm (4.7")' },
        { name: 'Accuracy', value: '±0.05 mm' },
        { name: 'Repeatability', value: '±0.02 mm' },
        { name: 'Max Speed', value: '6,000 mm/min (236 in/min)' },
        { name: 'Spindle', value: '200W, 13,000 RPM' },
        { name: 'Connectivity', value: 'WiFi, USB-C, Ethernet' }
    ],
    
    speedsAndFeeds: [
        { material: 'Softwood (6mm bit)', rpm: '8,000-10,000', feed: '100-150 mm/s' },
        { material: 'Softwood (3mm bit)', rpm: '10,000', feed: '80-120 mm/s' },
        { material: 'Hardwood (6mm bit)', rpm: '6,000-8,000', feed: '60-100 mm/s' },
        { material: 'Hardwood (3mm bit)', rpm: '8,000-10,000', feed: '50-80 mm/s' },
        { material: 'Acrylic (3mm bit)', rpm: '6,000-8,000', feed: '30-50 mm/s' }
    ],
    
    commonMistakes: [
        'Designing sharp internal corners—they will always come out rounded',
        'Cutting too deep in one pass—breaks bits and creates poor finish',
        'Ignoring grain direction in wood—can cause unpredictable chipping',
        'Skipping test runs—always test on scrap material first',
        'Using wrong speeds/feeds—causes burning or rough surfaces',
        'Forgetting clamping space—design for fixturing requirements',
        'Undersized tabs—parts fall out and move during cutting',
        'Using too small a bit for the job—fragile and slow'
    ],
    
    relatedLinks: [
        { title: 'Makera Official Website', url: 'https://www.makera.com', icon: '🏠' },
        { title: 'Makera Blog & Tutorials', url: 'https://www.makera.com/blogs', icon: '📝' },
        { title: 'Makera Wiki', url: 'https://wiki.makera.com', icon: '📚' },
        { title: 'r/Carvera Community', url: 'https://reddit.com/r/Carvera', icon: '👥' },
        { title: 'VCarve Pro (Vectric)', url: 'https://www.vectric.com', icon: '🎨' },
        { title: 'Fusion 360 (Autodesk)', url: 'https://www.autodesk.com/products/fusion-360', icon: '🔧' },
        { title: 'Easel (Inventables)', url: 'https://easel.inventables.com', icon: '💻' }
    ]
};
