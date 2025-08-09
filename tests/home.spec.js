test('home page loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    const title = await page.title();
    expect(title).toBe('Home Page Title');
});