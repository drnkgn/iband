let s:cpo_save=&cpo
set cpo&vim
inoremap <C-G>S <Plug>(nvim-surround-insert-line)
inoremap <C-G>s <Plug>(nvim-surround-insert)
cnoremap <silent> <Plug>(TelescopeFuzzyCommandSearch) e "lua require('telescope.builtin').command_history { default_text = [=[" . escape(getcmdline(), '"') . "]=] }"
inoremap <C-W> u
inoremap <C-U> u
xnoremap <silent> 	 :lua require('luasnip.util.util').store_selection()gv"_s
nnoremap  <Cmd>nohlsearch|diffupdate|normal! 
xnoremap # y?\V"
omap <silent> % <Plug>(MatchitOperationForward)
xmap <silent> % <Plug>(MatchitVisualForward)
nmap <silent> % <Plug>(MatchitNormalForward)
nnoremap & :&&
xnoremap * y/\V"
vnoremap J :m '>+1gv=gv
nnoremap J mzJ`z
vnoremap K :m '<-2gv=gv
xnoremap S <Plug>(nvim-surround-visual)
nnoremap Y y$
omap <silent> [% <Plug>(MatchitOperationMultiBackward)
xmap <silent> [% <Plug>(MatchitVisualMultiBackward)
nmap <silent> [% <Plug>(MatchitNormalMultiBackward)
omap <silent> ]% <Plug>(MatchitOperationMultiForward)
xmap <silent> ]% <Plug>(MatchitVisualMultiForward)
nmap <silent> ]% <Plug>(MatchitNormalMultiForward)
xmap a% <Plug>(MatchitVisualTextObject)
nnoremap cS <Plug>(nvim-surround-change-line)
nnoremap cs <Plug>(nvim-surround-change)
nnoremap ds <Plug>(nvim-surround-delete)
xnoremap gS <Plug>(nvim-surround-visual-line)
xmap gx <Plug>NetrwBrowseXVis
nmap gx <Plug>NetrwBrowseX
omap <silent> g% <Plug>(MatchitOperationBackward)
xmap <silent> g% <Plug>(MatchitVisualBackward)
nmap <silent> g% <Plug>(MatchitNormalBackward)
nnoremap ySS <Plug>(nvim-surround-normal-cur-line)
nnoremap yS <Plug>(nvim-surround-normal-line)
nnoremap yss <Plug>(nvim-surround-normal-cur)
nnoremap ys <Plug>(nvim-surround-normal)
xnoremap <silent> <Plug>(nvim-surround-visual-line) <Cmd>lua require'nvim-surround'.visual_surround({ line_mode = true })
xnoremap <silent> <Plug>(nvim-surround-visual) <Cmd>lua require'nvim-surround'.visual_surround({ line_mode = false })
xnoremap <silent> <Plug>NetrwBrowseXVis :call netrw#BrowseXVis()
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#BrowseX(netrw#GX(),netrw#CheckIfRemote(netrw#GX()))
xmap <silent> <Plug>(MatchitVisualTextObject) <Plug>(MatchitVisualMultiBackward)o<Plug>(MatchitVisualMultiForward)
onoremap <silent> <Plug>(MatchitOperationMultiForward) :call matchit#MultiMatch("W",  "o")
onoremap <silent> <Plug>(MatchitOperationMultiBackward) :call matchit#MultiMatch("bW", "o")
xnoremap <silent> <Plug>(MatchitVisualMultiForward) :call matchit#MultiMatch("W",  "n")m'gv``
xnoremap <silent> <Plug>(MatchitVisualMultiBackward) :call matchit#MultiMatch("bW", "n")m'gv``
nnoremap <silent> <Plug>(MatchitNormalMultiForward) :call matchit#MultiMatch("W",  "n")
nnoremap <silent> <Plug>(MatchitNormalMultiBackward) :call matchit#MultiMatch("bW", "n")
onoremap <silent> <Plug>(MatchitOperationBackward) :call matchit#Match_wrapper('',0,'o')
onoremap <silent> <Plug>(MatchitOperationForward) :call matchit#Match_wrapper('',1,'o')
xnoremap <silent> <Plug>(MatchitVisualBackward) :call matchit#Match_wrapper('',0,'v')m'gv``
xnoremap <silent> <Plug>(MatchitVisualForward) :call matchit#Match_wrapper('',1,'v'):if col("''") != col("$") | exe ":normal! m'" | endifgv``
nnoremap <silent> <Plug>(MatchitNormalBackward) :call matchit#Match_wrapper('',0,'n')
nnoremap <silent> <Plug>(MatchitNormalForward) :call matchit#Match_wrapper('',1,'n')
nnoremap <Plug>PlenaryTestFile :lua require('plenary.test_harness').test_directory(vim.fn.expand("%:p"))
nnoremap <C-L> <Cmd>nohlsearch|diffupdate|normal! 
inoremap S <Plug>(nvim-surround-insert-line)
inoremap s <Plug>(nvim-surround-insert)
inoremap  u
inoremap  u
let &cpo=s:cpo_save
unlet s:cpo_save
set completeopt=menuone,noinsert,noselect
set expandtab
set guicursor=i:block
set helplang=en
set inccommand=split
set indentkeys=0{,0},0),0],0,,!^F,o,O,e
set laststatus=3
set listchars=tab:|\ ,eol:âŒ…,precedes:â€¦,extends:â€¦,trail:Â·
set noloadplugins
set makeprg=ts-node\ main.ts
set mouse=nv
set packpath=/usr/local/share/nvim/runtime
set runtimepath=~/.config/nvim,~/.local/share/nvim/lazy/lazy.nvim,~/.local/share/nvim/lazy/fidget.nvim,~/.local/share/nvim/lazy/nvim-autopairs,~/.local/share/nvim/lazy/oil.nvim,~/.local/share/nvim/lazy/nvim-surround,~/.local/share/nvim/lazy/impatient.nvim,~/.local/share/nvim/lazy/nvim-treesitter,~/.local/share/nvim/lazy/LuaSnip,~/.local/share/nvim/lazy/cmp_luasnip,~/.local/share/nvim/lazy/lspkind-nvim,~/.local/share/nvim/lazy/cmp-buffer,~/.local/share/nvim/lazy/cmp-nvim-lsp,~/.local/share/nvim/lazy/nvim-cmp,~/.local/share/nvim/lazy/telescope.nvim,~/.local/share/nvim/lazy/telescope-fzf-native.nvim,~/.local/share/nvim/lazy/plenary.nvim,~/.local/share/nvim/lazy/vim-fugitive,~/.local/share/nvim/lazy/oxocarbon.nvim,~/.local/share/nvim/lazy/nvim-lspconfig,/usr/local/share/nvim/runtime,/usr/local/share/nvim/runtime/pack/dist/opt/matchit,/usr/local/lib/nvim,~/.local/state/nvim/lazy/readme,~/.local/share/nvim/lazy/cmp_luasnip/after,~/.local/share/nvim/lazy/cmp-buffer/after,~/.local/share/nvim/lazy/cmp-nvim-lsp/after
set scrolloff=10
set shiftwidth=4
set shortmess=filnxtToOFc
set noshowmode
set smartcase
set smartindent
set softtabstop=4
set noswapfile
set tabstop=4
set termguicolors
set undofile
set updatetime=50
set window=35
set nowritebackup
" vim: set ft=vim :
